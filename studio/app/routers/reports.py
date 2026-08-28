from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Evidence, Page

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("/quality")
def quality_report(db: Session = Depends(get_db)):
    pages = db.query(Page).filter(Page.quality_score.isnot(None)).all()
    buckets = Counter()
    for p in pages:
        score = p.quality_score or 0
        if score >= 95:
            buckets["95-100"] += 1
        elif score >= 90:
            buckets["90-94"] += 1
        elif score >= 85:
            buckets["85-89"] += 1
        else:
            buckets["<85"] += 1
    avg = round(sum(p.quality_score for p in pages) / len(pages), 2) if pages else 0.0
    return {"scored_pages": len(pages), "average_score": avg, "distribution": dict(buckets)}


@router.get("/evidence")
def evidence_report(db: Session = Depends(get_db)):
    total = db.query(Evidence).count()
    verified = db.query(Evidence).filter(Evidence.status == "verified").count()
    pending = db.query(Evidence).filter(Evidence.status == "pending").count()
    stale = db.query(Evidence).filter(Evidence.status == "stale").count()
    rejected = db.query(Evidence).filter(Evidence.status == "rejected").count()
    coverage = round(verified / total, 4) if total else 0.0
    return {
        "total_evidence": total,
        "verified": verified,
        "pending": pending,
        "stale": stale,
        "rejected": rejected,
        "verified_ratio": coverage,
    }


@router.get("/duplicates")
def duplicate_report(db: Session = Depends(get_db)):
    pages = db.query(Page).filter(Page.title.isnot(None)).all()
    titles = Counter(p.title for p in pages)
    dupes = {title: count for title, count in titles.items() if count > 1}
    return {"duplicate_title_groups": len(dupes), "titles": dupes}


@router.get("/cannibalization")
def cannibalization_report(db: Session = Depends(get_db)):
    """
    Flags pages whose primary entity is shared by more than one published page —
    a real signal of two pages competing for the same query, computed from
    actual foreign-key relationships, not guessed.
    """
    pages = db.query(Page).filter(Page.status == "published", Page.primary_entity_id.isnot(None)).all()
    by_entity: dict[int, list[str]] = {}
    for p in pages:
        by_entity.setdefault(p.primary_entity_id, []).append(p.slug)
    conflicts = {eid: slugs for eid, slugs in by_entity.items() if len(slugs) > 1}
    return {"conflicting_entities": len(conflicts), "conflicts": conflicts}


@router.get("/geo")
def geo_report(db: Session = Depends(get_db)):
    """GEO = generative-engine-optimization readiness: does each published page have
    the machine-consumable structure an AI answer engine needs?"""
    pages = db.query(Page).filter(Page.status == "published").all()
    has_entity = sum(1 for p in pages if p.primary_entity_id)
    has_meta = sum(1 for p in pages if p.meta_description)
    ready = sum(1 for p in pages if p.primary_entity_id and p.meta_description and (p.quality_score or 0) >= 85)
    return {
        "published_pages": len(pages),
        "pages_with_primary_entity": has_entity,
        "pages_with_meta_description": has_meta,
        "geo_ready_pages": ready,
    }
