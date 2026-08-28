import os

from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db import get_db, init_db
from app.models import Entity, Evidence, GenerationJob, Page
from app.openrouter import status as openrouter_status
from app.routers import audit, discovery, entities, evidence as evidence_router, generation, pages, reports

is_production = os.getenv("STUDIO_ENV", "development").lower() == "production"
app = FastAPI(
    title="BestAIAgent Studio",
    version="0.2.0",
    docs_url=None if is_production else "/docs",
    redoc_url=None if is_production else "/redoc",
    openapi_url=None if is_production else "/openapi.json",
)

init_db()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.include_router(pages.router)
app.include_router(evidence_router.router)
app.include_router(entities.router)
app.include_router(reports.router)
app.include_router(generation.router)
app.include_router(discovery.router)
app.include_router(audit.router)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cache-Control"] = "no-store" if request.url.path.startswith("/api/") else "no-cache"
    return response


def _real_stats(db: Session) -> dict:
    total_pages = db.query(Page).count()
    published = db.query(Page).filter(Page.status == "published").count()
    review = db.query(Page).filter(Page.status == "review").count()
    draft = db.query(Page).filter(Page.status == "draft").count()
    rejected = db.query(Page).filter(Page.status == "rejected").count()
    total_entities = db.query(Entity).count()
    total_evidence = db.query(Evidence).count()
    verified_evidence = db.query(Evidence).filter(Evidence.status == "verified").count()
    evidence_coverage = round(verified_evidence / total_evidence, 4) if total_evidence else 0.0
    scored = db.query(Page).filter(Page.quality_score.isnot(None)).all()
    avg_quality = round(sum(p.quality_score for p in scored) / len(scored), 2) if scored else 0.0
    queued_jobs = db.query(GenerationJob).filter(GenerationJob.status == "queued").count()

    return {
        "total_pages": total_pages,
        "published": published,
        "review": review,
        "draft": draft,
        "rejected": rejected,
        "total_entities": total_entities,
        "total_evidence": total_evidence,
        "verified_evidence": verified_evidence,
        "evidence_coverage": evidence_coverage,
        "average_quality": avg_quality,
        "queued_jobs": queued_jobs,
    }


@app.get("/api/health")
def health(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        db_state = "connected"
    except Exception as exc:  # noqa: BLE001
        db_state = f"error: {exc}"
    return {"status": "ok", "database": db_state, "ai_provider": openrouter_status()}


@app.get("/api/stats")
def stats(db: Session = Depends(get_db)):
    return _real_stats(db)


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    s = _real_stats(db)
    recent_pages = db.query(Page).order_by(Page.updated_at.desc()).limit(10).all()
    provider = openrouter_status()
    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {
            "stats": s,
            "recent_pages": recent_pages,
            "provider": provider,
        },
    )
