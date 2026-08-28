import json

from sqlalchemy.orm import Session

from app.auth import Actor
from app.models import AuditEvent


def record_audit(
    db: Session,
    actor: Actor,
    action: str,
    object_type: str,
    object_id: int | str,
    *,
    prior_state=None,
    new_state=None,
    reason: str | None = None,
) -> AuditEvent:
    event = AuditEvent(
        actor_name=actor.name,
        actor_role=actor.role,
        action=action,
        object_type=object_type,
        object_id=str(object_id),
        prior_state=json.dumps(prior_state, sort_keys=True) if prior_state is not None else None,
        new_state=json.dumps(new_state, sort_keys=True) if new_state is not None else None,
        reason=reason,
    )
    db.add(event)
    return event
