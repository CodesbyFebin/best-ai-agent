from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import Actor, require_admin
from app.db import get_db
from app.models import AuditEvent

router = APIRouter(prefix="/api/audit", tags=["audit"])


@router.get("/events")
def audit_events(db: Session = Depends(get_db), actor: Actor = Depends(require_admin)):
    rows = db.query(AuditEvent).order_by(AuditEvent.created_at.desc()).limit(500).all()
    return [
        {
            "id": row.id,
            "actor": row.actor_name,
            "role": row.actor_role,
            "action": row.action,
            "object_type": row.object_type,
            "object_id": row.object_id,
            "prior_state": row.prior_state,
            "new_state": row.new_state,
            "reason": row.reason,
            "created_at": row.created_at.isoformat(),
        }
        for row in rows
    ]
