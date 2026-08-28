from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.audit import record_audit
from app.auth import Actor, require_editor
from app.db import get_db
from app.models import Entity, EntityRelationship
from app.schemas import EntityIn, EntityOut

router = APIRouter(prefix="/api/entities", tags=["entities"])


@router.get("", response_model=list[EntityOut])
def list_entities(entity_type: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Entity)
    if entity_type:
        q = q.filter(Entity.entity_type == entity_type)
    return q.order_by(Entity.name).all()


@router.get("/{slug}", response_model=EntityOut)
def get_entity(slug: str, db: Session = Depends(get_db)):
    entity = db.query(Entity).filter(Entity.slug == slug).first()
    if not entity:
        raise HTTPException(404, "Entity not found")
    return entity


@router.get("/{slug}/relationships")
def get_relationships(slug: str, db: Session = Depends(get_db)):
    entity = db.query(Entity).filter(Entity.slug == slug).first()
    if not entity:
        raise HTTPException(404, "Entity not found")
    outgoing = db.query(EntityRelationship).filter(EntityRelationship.from_entity_id == entity.id).all()
    incoming = db.query(EntityRelationship).filter(EntityRelationship.to_entity_id == entity.id).all()
    return {
        "outgoing": [{"relation": r.relation, "to": r.to_entity.slug, "name": r.to_entity.name} for r in outgoing],
        "incoming": [{"relation": r.relation, "from": r.from_entity.slug, "name": r.from_entity.name} for r in incoming],
    }


@router.post("", response_model=EntityOut)
def create_entity(entity: EntityIn, db: Session = Depends(get_db), actor: Actor = Depends(require_editor)):
    if db.query(Entity).filter(Entity.slug == entity.slug).first():
        raise HTTPException(409, f"Entity with slug '{entity.slug}' already exists")
    payload = entity.model_dump()
    payload["verification_state"] = "unknown"
    row = Entity(**payload)
    db.add(row)
    db.flush()
    record_audit(db, actor, "entity.created", "entity", row.id, new_state={"slug": row.slug, "verification_state": row.verification_state})
    db.commit()
    db.refresh(row)
    return row
