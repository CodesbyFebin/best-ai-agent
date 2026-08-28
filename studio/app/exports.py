"""
Machine-readable exports. Every function reads live rows from the database —
there is no static template with placeholder counts. An empty database
produces an empty (but valid) sitemap/feed, honestly.
"""
import os
from datetime import datetime, timezone
from xml.sax.saxutils import escape

from sqlalchemy.orm import Session

from app.models import Entity, EntityRelationship, Evidence, Page

SITE_URL = os.getenv("SITE_URL", "https://bestaiagent.in").rstrip("/")


def _published_pages(db: Session) -> list[Page]:
    return db.query(Page).filter(Page.status == "published").order_by(Page.published_at.desc()).all()


def build_sitemap_xml(db: Session) -> str:
    pages = _published_pages(db)
    urls = "\n".join(
        f"  <url><loc>{escape(SITE_URL)}/{escape(p.slug)}</loc>"
        f"<lastmod>{(p.updated_at or p.created_at).date().isoformat()}</lastmod></url>"
        for p in pages
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n"
        "</urlset>\n"
    )


def build_robots_txt(db: Session) -> str:
    return (
        "User-agent: *\n"
        "Allow: /\n\n"
        f"Sitemap: {SITE_URL}/sitemap.xml\n"
    )


def build_llms_txt(db: Session) -> str:
    published = _published_pages(db)
    lines = [
        "# BestAIAgent Studio",
        "",
        "Evidence-gated AI agent research and publishing platform. Every published",
        "page has passed a hard quality gate: minimum evidence coverage, no unsupported",
        "critical claims, no duplicate titles, and a minimum quality score.",
        "",
        f"## Published pages ({len(published)})",
    ]
    for p in published:
        lines.append(f"- {SITE_URL}/{p.slug} — {p.title or p.slug}")
    lines.append("")
    lines.append(f"Machine catalog: {SITE_URL}/entities.json")
    lines.append(f"Knowledge graph: {SITE_URL}/knowledge-graph.json")
    lines.append(f"Evidence ledger: {SITE_URL}/evidence.json")
    return "\n".join(lines) + "\n"


def build_entities_json(db: Session) -> dict:
    entities = db.query(Entity).all()
    return {
        "schemaVersion": "1.0",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "count": len(entities),
        "entities": [
            {
                "slug": e.slug,
                "name": e.name,
                "type": e.entity_type,
                "summary": e.summary,
                "homepageUrl": e.homepage_url,
                "repoUrl": e.repo_url,
                "stars": e.stars,
                "license": e.license,
                "sourceOfRecord": e.source_of_record,
                "verification": e.verification_state,
            }
            for e in entities
        ],
    }


def build_knowledge_graph_json(db: Session) -> dict:
    entities = db.query(Entity).all()
    relationships = db.query(EntityRelationship).all()
    return {
        "schemaVersion": "1.0",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "nodes": [{"id": e.slug, "name": e.name, "type": e.entity_type} for e in entities],
        "edges": [
            {"from": r.from_entity.slug, "to": r.to_entity.slug, "relation": r.relation}
            for r in relationships
        ],
    }


def build_evidence_json(db: Session) -> dict:
    evidence_rows = db.query(Evidence).all()
    return {
        "schemaVersion": "1.0",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "count": len(evidence_rows),
        "evidence": [
            {
                "claimId": ev.claim_id,
                "field": ev.claim.field if ev.claim else None,
                "sourceUrl": ev.source.url if ev.source else None,
                "publisher": ev.source.publisher if ev.source else None,
                "retrievedAt": ev.retrieved_at.isoformat() if ev.retrieved_at else None,
                "status": ev.status,
                "passage": ev.passage,
            }
            for ev in evidence_rows
        ],
    }


def build_rss_xml(db: Session) -> str:
    pages = _published_pages(db)[:50]
    items = "\n".join(
        f"    <item><title>{escape(p.title or p.slug)}</title>"
        f"<link>{escape(SITE_URL)}/{escape(p.slug)}</link>"
        f"<guid>{escape(SITE_URL)}/{escape(p.slug)}</guid>"
        f"<pubDate>{(p.published_at or p.created_at).strftime('%a, %d %b %Y %H:%M:%S GMT')}</pubDate>"
        f"<description>{escape(p.meta_description or '')}</description></item>"
        for p in pages
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0"><channel>\n'
        "    <title>BestAIAgent Studio</title>\n"
        f"    <link>{SITE_URL}</link>\n"
        "    <description>Evidence-gated AI agent research and publishing.</description>\n"
        f"{items}\n"
        "</channel></rss>\n"
    )


def build_atom_xml(db: Session) -> str:
    pages = _published_pages(db)[:50]
    now = datetime.now(timezone.utc).isoformat()
    entries = "\n".join(
        f"  <entry><title>{escape(p.title or p.slug)}</title>"
        f'<link href="{escape(SITE_URL)}/{escape(p.slug)}"/>'
        f"<id>{escape(SITE_URL)}/{escape(p.slug)}</id>"
        f"<updated>{(p.updated_at or p.created_at).isoformat()}</updated></entry>"
        for p in pages
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<feed xmlns="http://www.w3.org/2005/Atom">\n'
        "  <title>BestAIAgent Studio</title>\n"
        f"  <id>{SITE_URL}/</id>\n"
        f"  <updated>{now}</updated>\n"
        f"{entries}\n"
        "</feed>\n"
    )
