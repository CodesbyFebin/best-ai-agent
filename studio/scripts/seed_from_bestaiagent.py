"""
Seeds the Studio database with REAL data already gathered and evidence-hashed
in the bestaiagent-production repo: verified entity identities (from
lib/entities.ts) and their evidence receipts (from lib/evidence.ts), including
the real SHA-256 content hashes and real retrieval timestamps.

This is a one-time import of genuine prior work — nothing here is invented.

Usage:
    python scripts/seed_from_bestaiagent.py [path-to-bestaiagent-production]
"""
import re
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db import SessionLocal, init_db  # noqa: E402
from app.models import Claim, Entity, Evidence, Source  # noqa: E402

DEFAULT_SOURCE_REPO = Path.home() / "bestaiagent-production"


def _field(entry: str, name: str, quoted: bool = True) -> str | None:
    if quoted:
        m = re.search(rf'{name}:\s*"((?:[^"\\]|\\.)*)"', entry)
    else:
        m = re.search(rf"{name}:\s*(\w+)", entry)
    return m.group(1) if m else None


def _bool_field(entry: str, name: str) -> bool:
    return _field(entry, name, quoted=False) == "true"


def split_ts_array(text: str, array_name: str) -> list[str]:
    m = re.search(rf"export const {array_name}[^=]*=\s*\[", text)
    if not m:
        return []
    start = m.end()
    depth = 1
    obj_depth = 0
    entry_start = None
    entries = []
    i = start
    while i < len(text):
        c = text[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                break
        elif c == "{":
            if obj_depth == 0:
                entry_start = i
            obj_depth += 1
        elif c == "}":
            obj_depth -= 1
            if obj_depth == 0 and entry_start is not None:
                entries.append(text[entry_start : i + 1])
                entry_start = None
        i += 1
    return entries


def parse_entities(source_repo: Path) -> list[dict]:
    text = (source_repo / "lib" / "entities.ts").read_text()
    out = []
    for entry in split_ts_array(text, "entities"):
        out.append(
            {
                "id": _field(entry, "id"),
                "type": _field(entry, "type"),
                "slug": _field(entry, "slug"),
                "name": _field(entry, "name"),
                "developer": _field(entry, "developer"),
                "summary": _field(entry, "summary"),
                "sourceUrl": _field(entry, "sourceUrl"),
                "verification": _field(entry, "verification"),
            }
        )
    # recovery-entities.ts holds additional real verified entities (e.g. Cursor)
    recovery_path = source_repo / "lib" / "recovery-entities.ts"
    if recovery_path.exists():
        rtext = recovery_path.read_text()
        for entry in split_ts_array(rtext, "recoveryEntities"):
            out.append(
                {
                    "id": _field(entry, "id"),
                    "type": _field(entry, "type"),
                    "slug": _field(entry, "slug"),
                    "name": _field(entry, "name"),
                    "developer": _field(entry, "developer"),
                    "summary": _field(entry, "summary"),
                    "sourceUrl": _field(entry, "sourceUrl"),
                    "verification": _field(entry, "verification"),
                }
            )
    return out


def parse_evidence(source_repo: Path) -> list[dict]:
    text = (source_repo / "lib" / "evidence.ts").read_text()
    out = []
    for entry in split_ts_array(text, "evidence"):
        out.append(
            {
                "id": _field(entry, "id"),
                "entityId": _field(entry, "entityId"),
                "field": _field(entry, "field"),
                "sourceUrl": _field(entry, "sourceUrl"),
                "publisher": _field(entry, "publisher"),
                "authority": _field(entry, "authority"),
                "retrievedAt": _field(entry, "retrievedAt"),
                "contentHash": _field(entry, "contentHash"),
                "status": _field(entry, "status"),
            }
        )
    return out


def main() -> None:
    source_repo = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SOURCE_REPO
    if not (source_repo / "lib" / "entities.ts").exists():
        print(f"ERROR: {source_repo}/lib/entities.ts not found. Pass the bestaiagent-production path as an argument.")
        sys.exit(1)

    init_db()
    db = SessionLocal()

    raw_entities = parse_entities(source_repo)
    raw_evidence = parse_evidence(source_repo)

    entity_by_id: dict[str, Entity] = {}
    created_entities = 0
    for re_ in raw_entities:
        if not re_["slug"]:
            continue
        existing = db.query(Entity).filter(Entity.slug == re_["slug"]).first()
        if existing:
            entity_by_id[re_["id"]] = existing
            continue
        entity = Entity(
            slug=re_["slug"],
            name=re_["name"] or re_["slug"],
            entity_type=re_["type"] or "agent",
            summary=re_["summary"],
            homepage_url=re_["sourceUrl"],
            source_of_record="manual-import:bestaiagent-production/lib/entities.ts",
            verification_state=re_["verification"] or "unknown",
        )
        db.add(entity)
        db.flush()
        entity_by_id[re_["id"]] = entity
        created_entities += 1

    created_sources = 0
    created_claims = 0
    created_evidence = 0
    for ev in raw_evidence:
        entity = entity_by_id.get(ev["entityId"])
        if not entity or not ev["sourceUrl"]:
            continue

        source = db.query(Source).filter(Source.url == ev["sourceUrl"]).first()
        if not source:
            source = Source(
                url=ev["sourceUrl"],
                publisher=ev["publisher"] or "unknown",
                source_type="official-repository-api" if "github.com/repos" in ev["sourceUrl"] else "official-model-card",
                authority=ev["authority"] or "primary",
                retrieved_at=_parse_dt(ev["retrievedAt"]),
            )
            db.add(source)
            db.flush()
            created_sources += 1

        claim = Claim(
            page_id=None,  # entity-level identity claim, not yet attached to a page
            entity_id=entity.id,
            field=ev["field"] or "identity",
            statement=f"{entity.name} identity verified via {ev['publisher']} ({ev['field']}).",
            is_critical=True,
        )
        db.add(claim)
        db.flush()
        created_claims += 1

        evidence = Evidence(
            claim_id=claim.id,
            source_id=source.id,
            passage=f"contentHash={ev['contentHash']}",
            retrieved_at=_parse_dt(ev["retrievedAt"]),
            status=ev["status"] or "verified",
        )
        db.add(evidence)
        created_evidence += 1

    db.commit()
    db.close()

    print(f"Imported from {source_repo}:")
    print(f"  entities created : {created_entities} (of {len(raw_entities)} parsed)")
    print(f"  sources created  : {created_sources}")
    print(f"  evidence created : {created_evidence} (of {len(raw_evidence)} parsed)")


def _parse_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).replace(tzinfo=None)
    except ValueError:
        return None


if __name__ == "__main__":
    main()
