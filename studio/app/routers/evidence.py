from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.audit import record_audit
from app.auth import Actor, require_editor, require_reviewer
from app.db import get_db
from app.models import Claim, Evidence, Page, Source

router = APIRouter(prefix="/api", tags=["evidence"])


class ClaimIn(BaseModel):
    page_id: int
    entity_id: int | None = None
    field: str
    statement: str
    is_critical: bool = False


class SourceIn(BaseModel):
    url: str
    publisher: str
    source_type: str = "unknown"
    authority: str = "secondary"
    retrieved_at: datetime | None = None


class EvidenceIn(BaseModel):
    claim_id: int
    source: SourceIn
    passage: str | None = None


@router.post("/claims")
def create_claim(claim_in: ClaimIn, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    page = db.get(Page, claim_in.page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    claim = Claim(**claim_in.model_dump())
    db.add(claim)
    db.flush()
    record_audit(db, actor, "claim.created", "claim", claim.id, new_state={"field": claim.field, "is_critical": claim.is_critical})
    db.commit()
    db.refresh(claim)
    return {"id": claim.id, "field": claim.field, "is_critical": claim.is_critical}


@router.get("/evidence")
def list_evidence(status: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Evidence)
    if status:
        q = q.filter(Evidence.status == status)
    rows = q.all()
    return [
        {
            "id": e.id,
            "claim_id": e.claim_id,
            "field": e.claim.field if e.claim else None,
            "source_url": e.source.url if e.source else None,
            "status": e.status,
            "retrieved_at": e.retrieved_at.isoformat() if e.retrieved_at else None,
        }
        for e in rows
    ]


@router.post("/evidence")
def create_evidence(ev_in: EvidenceIn, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    claim = db.get(Claim, ev_in.claim_id)
    if not claim:
        raise HTTPException(404, "Claim not found")

    source = db.query(Source).filter(Source.url == ev_in.source.url).first()
    if not source:
        source = Source(**ev_in.source.model_dump())
        db.add(source)
        db.flush()

    evidence = Evidence(
        claim_id=ev_in.claim_id,
        source_id=source.id,
        passage=ev_in.passage,
        retrieved_at=ev_in.source.retrieved_at,
        status="pending",
    )
    db.add(evidence)
    db.flush()
    record_audit(db, actor, "evidence.created", "evidence", evidence.id, new_state={"claim_id": evidence.claim_id, "status": "pending", "source_url": source.url})
    db.commit()
    db.refresh(evidence)
    return {"id": evidence.id, "status": evidence.status, "source_url": source.url}


@router.put("/evidence/{evidence_id}")
def update_evidence(evidence_id: int, status: str, reason: str, db: Session = Depends(get_db), actor: Actor = Depends(require_reviewer)):
    evidence = db.get(Evidence, evidence_id)
    if not evidence:
        raise HTTPException(404, "Evidence not found")
    if status not in {"verified", "pending", "stale", "rejected"}:
        raise HTTPException(400, "Invalid status")
    if not reason.strip():
        raise HTTPException(400, "A review reason is required")
    if status == "verified":
        if not evidence.passage or not evidence.passage.strip():
            raise HTTPException(400, "Verified evidence requires a captured passage")
        if not evidence.retrieved_at:
            raise HTTPException(400, "Verified evidence requires a retrieval timestamp")
    prior = evidence.status
    evidence.status = status
    record_audit(db, actor, "evidence.status_changed", "evidence", evidence.id, prior_state={"status": prior}, new_state={"status": status}, reason=reason.strip())
    db.commit()
    return {"id": evidence.id, "status": evidence.status}
