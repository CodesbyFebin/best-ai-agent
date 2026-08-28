import json

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.audit import record_audit
from app.auth import Actor, require_admin, require_editor, require_reviewer
from app.db import get_db
from app.models import Page, PageApproval, PublicationEvent, QualityScore
from app.quality import compute_quality, page_body_sha256
from app.schemas import PageDetailOut, PageIn, PageOut, QualityOut

router = APIRouter(prefix="/api/pages", tags=["pages"])


class ReviewIn(BaseModel):
    decision: str
    reason: str


@router.get("", response_model=list[PageOut])
def list_pages(status: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Page)
    if status:
        q = q.filter(Page.status == status)
    return q.order_by(Page.updated_at.desc()).all()


@router.get("/{page_id}", response_model=PageDetailOut)
def get_page(page_id: int, db: Session = Depends(get_db)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    return page


@router.post("", response_model=PageOut)
def create_page(page_in: PageIn, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    if db.query(Page).filter(Page.slug == page_in.slug).first():
        raise HTTPException(409, f"Page with slug '{page_in.slug}' already exists")
    page = Page(**page_in.model_dump())
    page.word_count = len((page.body_markdown or "").split())
    db.add(page)
    db.flush()
    record_audit(db, actor, "page.created", "page", page.id, new_state={"slug": page.slug, "status": page.status})
    db.commit()
    db.refresh(page)
    return page


@router.put("/{page_id}", response_model=PageOut)
def update_page(page_id: int, page_in: PageIn, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    prior = {"slug": page.slug, "status": page.status, "body_sha256": page_body_sha256(page)}
    for key, value in page_in.model_dump().items():
        setattr(page, key, value)
    page.word_count = len((page.body_markdown or "").split())
    record_audit(db, actor, "page.updated", "page", page.id, prior_state=prior, new_state={"slug": page.slug, "status": page.status, "body_sha256": page_body_sha256(page)})
    db.commit()
    db.refresh(page)
    return page


@router.delete("/{page_id}")
def delete_page(page_id: int, db: Session = Depends(get_db), actor: Actor = Depends(require_admin)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    record_audit(db, actor, "page.deleted", "page", page.id, prior_state={"slug": page.slug, "status": page.status})
    db.delete(page)
    db.commit()
    return {"deleted": page_id}


@router.post("/{page_id}/validate", response_model=QualityOut)
def validate_page(page_id: int, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    """Recompute the real quality score and gate result, and persist a QualityScore row."""
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")

    result = compute_quality(db, page)
    page.quality_score = result.total

    qs = QualityScore(
        page_id=page.id,
        intent=result.scores["intent"],
        factual_accuracy=result.scores["factual_accuracy"],
        original_information=result.scores["original_information"],
        answerability=result.scores["answerability"],
        entity_completeness=result.scores["entity_completeness"],
        evidence_score=result.scores["evidence_score"],
        internal_linking=result.scores["internal_linking"],
        ux_readability=result.scores["ux_readability"],
        technical_seo=result.scores["technical_seo"],
        schema_accuracy=result.scores["schema_accuracy"],
        total=result.total,
        gate_passed=result.gate_passed,
        gate_failures=json.dumps(result.gate_failures),
    )
    db.add(qs)

    if page.status == "draft" and result.gate_passed:
        page.status = "review"

    record_audit(db, actor, "page.validated", "page", page.id, new_state={"score": result.total, "gate_passed": result.gate_passed})
    db.commit()
    return QualityOut(scores=result.scores, total=result.total, gate_passed=result.gate_passed, gate_failures=result.gate_failures)


@router.post("/{page_id}/publish", response_model=PageOut)
def publish_page(page_id: int, db: Session = Depends(get_db), actor: Actor = Depends(require_reviewer)):
    """
    Hard gate: publish only succeeds if the freshly recomputed quality result
    passes every condition. This endpoint always recomputes — it never trusts
    a stale quality_score already stored on the row.
    """
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")

    result = compute_quality(db, page)
    page.quality_score = result.total

    if not result.gate_passed:
        db.add(PublicationEvent(page_id=page.id, action="rejected", reason="; ".join(result.gate_failures)))
        record_audit(db, actor, "page.publish_blocked", "page", page.id, prior_state={"status": page.status}, new_state={"score": result.total}, reason="; ".join(result.gate_failures))
        db.commit()
        raise HTTPException(422, {"message": "Publish gate failed", "failures": result.gate_failures})

    from datetime import datetime

    page.status = "published"
    page.published_at = datetime.utcnow()
    db.add(PublicationEvent(page_id=page.id, action="published", reason=None))
    record_audit(db, actor, "page.published", "page", page.id, prior_state={"status": "review"}, new_state={"status": "published", "score": result.total})
    db.commit()
    db.refresh(page)
    return page


@router.post("/{page_id}/reject", response_model=PageOut)
def reject_page(page_id: int, reason: str = "", db: Session = Depends(get_db), actor: Actor = Depends(require_reviewer)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    page.status = "rejected"
    db.add(PublicationEvent(page_id=page.id, action="rejected", reason=reason))
    record_audit(db, actor, "page.rejected", "page", page.id, prior_state={"status": "review"}, new_state={"status": "rejected"}, reason=reason)
    db.commit()
    db.refresh(page)
    return page


@router.post("/{page_id}/review")
def review_page(page_id: int, review: ReviewIn, db: Session = Depends(get_db), actor: Actor = Depends(require_reviewer)):
    if review.decision not in {"approved", "rejected"}:
        raise HTTPException(400, "Decision must be approved or rejected")
    if not review.reason.strip():
        raise HTTPException(400, "A review reason is required")
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    approval = PageApproval(
        page_id=page.id,
        body_sha256=page_body_sha256(page),
        decision=review.decision,
        actor_name=actor.name,
        actor_role=actor.role,
        reason=review.reason.strip(),
    )
    db.add(approval)
    page.status = "review" if review.decision == "approved" else "rejected"
    db.flush()
    record_audit(db, actor, f"page.review_{review.decision}", "page", page.id, new_state={"decision": review.decision, "body_sha256": approval.body_sha256}, reason=approval.reason)
    db.commit()
    return {"page_id": page.id, "decision": approval.decision, "reviewer": approval.actor_name, "body_sha256": approval.body_sha256}

