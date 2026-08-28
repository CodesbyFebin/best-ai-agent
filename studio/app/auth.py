"""Small, explicit bearer-token trust boundary for the standalone Studio.

Tokens are supplied through environment variables and are never persisted.
This is intentionally simple enough for a self-hosted deployment while still
enforcing role separation between editing and review.
"""
import hmac
import os
from dataclasses import dataclass

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


@dataclass(frozen=True)
class Actor:
    name: str
    role: str


bearer = HTTPBearer(auto_error=False)


def _configured_actors() -> list[tuple[str, Actor]]:
    actors: list[tuple[str, Actor]] = []
    for role in ("admin", "editor", "reviewer"):
        token = os.getenv(f"STUDIO_{role.upper()}_TOKEN", "").strip()
        name = os.getenv(f"STUDIO_{role.upper()}_NAME", role).strip() or role
        if token:
            actors.append((token, Actor(name=name, role=role)))
    return actors


def current_actor(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
) -> Actor:
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(401, "Bearer authentication required")
    for token, actor in _configured_actors():
        if hmac.compare_digest(credentials.credentials, token):
            return actor
    raise HTTPException(401, "Invalid bearer token")


def require_roles(*roles: str):
    def dependency(actor: Actor = Depends(current_actor)) -> Actor:
        if actor.role not in roles:
            raise HTTPException(403, f"Requires one of these roles: {', '.join(roles)}")
        return actor

    return dependency


require_editor = require_roles("editor", "admin")
require_reviewer = require_roles("reviewer", "admin")
require_admin = require_roles("admin")
