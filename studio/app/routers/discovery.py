from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.db import get_db
from app import exports

router = APIRouter(tags=["discovery"])


@router.get("/sitemap.xml")
def sitemap(db: Session = Depends(get_db)):
    return Response(content=exports.build_sitemap_xml(db), media_type="application/xml")


@router.get("/robots.txt")
def robots(db: Session = Depends(get_db)):
    return Response(content=exports.build_robots_txt(db), media_type="text/plain")


@router.get("/llms.txt")
def llms_txt(db: Session = Depends(get_db)):
    return Response(content=exports.build_llms_txt(db), media_type="text/plain")


@router.get("/entities.json")
def entities_json(db: Session = Depends(get_db)):
    return exports.build_entities_json(db)


@router.get("/knowledge-graph.json")
def knowledge_graph_json(db: Session = Depends(get_db)):
    return exports.build_knowledge_graph_json(db)


@router.get("/evidence.json")
def evidence_json(db: Session = Depends(get_db)):
    return exports.build_evidence_json(db)


@router.get("/rss.xml")
def rss(db: Session = Depends(get_db)):
    return Response(content=exports.build_rss_xml(db), media_type="application/rss+xml")


@router.get("/atom.xml")
def atom(db: Session = Depends(get_db)):
    return Response(content=exports.build_atom_xml(db), media_type="application/atom+xml")


@router.get("/api/discovery/entities")
def discovery_entities(db: Session = Depends(get_db)):
    return exports.build_entities_json(db)


@router.get("/api/discovery/pages")
def discovery_pages(db: Session = Depends(get_db)):
    from app.models import Page

    pages = db.query(Page).filter(Page.status == "published").all()
    return {"count": len(pages), "pages": [{"slug": p.slug, "title": p.title} for p in pages]}


@router.get("/api/discovery/facts")
def discovery_facts(db: Session = Depends(get_db)):
    return exports.build_evidence_json(db)
