"""
Generation queue endpoints. "Generate" is the only step that touches an LLM
(via OpenRouter) and it honestly reports state=not_configured rather than
fabricating a draft when no API key is set. Research/validate/publish operate
purely on data already in the database.
"""
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import Actor, require_editor
from app.db import get_db
from app.models import GenerationJob, Page
from app.openrouter import generate_draft, status as openrouter_status
from app.quality import compute_quality

router = APIRouter(prefix="/api", tags=["generation"])


def _log_job(db: Session, page_id: int | None, job_type: str, status: str, log: str) -> GenerationJob:
    job = GenerationJob(page_id=page_id, job_type=job_type, status=status, log=log, finished_at=datetime.utcnow())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.post("/research/{page_id}")
def research_page(page_id: int, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    """
    Research is a data-gathering step, not an LLM step: it reports how many
    sources/claims/evidence already exist for this page so an operator (or a
    future scraper adapter) knows what's actually missing before generation.
    """
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    claim_count = len(page.claims)
    evidence_count = sum(len(c.evidence) for c in page.claims)
    log = f"{claim_count} claim(s), {evidence_count} evidence record(s) currently attached."
    job = _log_job(db, page_id, "research", "done", log)
    return {"job_id": job.id, "status": job.status, "log": job.log}


@router.post("/generate/{page_id}")
async def generate_page(page_id: int, prompt: str, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")

    result = await generate_draft(prompt, system="You are a factual, evidence-first technical writer.")

    if result["state"] == "not_configured":
        job = _log_job(db, page_id, "generate", "failed", "OpenRouter is not configured (OPENROUTER_API_KEY unset).")
        raise HTTPException(503, {"message": "AI provider not configured", "job_id": job.id})

    if result["state"] == "error":
        job = _log_job(db, page_id, "generate", "failed", result["error"])
        raise HTTPException(502, {"message": "Generation failed", "error": result["error"], "job_id": job.id})

    page.body_markdown = result["content"]
    page.word_count = len(result["content"].split())
    db.commit()

    job = _log_job(db, page_id, "generate", "done", f"Generated {page.word_count} words via {result.get('model')}.")
    return {"job_id": job.id, "status": job.status, "word_count": page.word_count}


@router.post("/validate/{page_id}")
def validate_page(page_id: int, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    page = db.get(Page, page_id)
    if not page:
        raise HTTPException(404, "Page not found")
    result = compute_quality(db, page)
    page.quality_score = result.total
    db.commit()
    job = _log_job(
        db, page_id, "validate", "done",
        f"score={result.total} gate_passed={result.gate_passed} failures={result.gate_failures}",
    )
    return {"job_id": job.id, "total": result.total, "gate_passed": result.gate_passed, "gate_failures": result.gate_failures}


@router.get("/jobs")
def list_jobs(job_type: str | None = None, db: Session = Depends(get_db)):
    q = db.query(GenerationJob)
    if job_type:
        q = q.filter(GenerationJob.job_type == job_type)
    rows = q.order_by(GenerationJob.created_at.desc()).limit(100).all()
    return [
        {"id": j.id, "page_id": j.page_id, "job_type": j.job_type, "status": j.status, "log": j.log, "created_at": j.created_at.isoformat()}
        for j in rows
    ]


@router.get("/provider/status")
def provider_status():
    return openrouter_status()
