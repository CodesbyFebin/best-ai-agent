import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db import Base, get_db  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture()
def client(monkeypatch):
    monkeypatch.setenv("STUDIO_EDITOR_TOKEN", "editor-test-token")
    monkeypatch.setenv("STUDIO_EDITOR_NAME", "Test Editor")
    monkeypatch.setenv("STUDIO_REVIEWER_TOKEN", "reviewer-test-token")
    monkeypatch.setenv("STUDIO_REVIEWER_NAME", "Test Reviewer")
    monkeypatch.setenv("STUDIO_ADMIN_TOKEN", "admin-test-token")
    monkeypatch.setenv("STUDIO_ADMIN_NAME", "Test Admin")

    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)

    def override_db():
        db = Session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def auth(token):
    return {"Authorization": f"Bearer {token}"}


def test_mutations_require_auth_and_roles(client):
    page = {
        "slug": "secure-page",
        "page_type": "article",
        "title": "A secure page with a real title",
        "meta_description": "A complete description used to test authenticated Studio mutations safely.",
        "body_markdown": "word " * 320,
    }
    assert client.post("/api/pages", json=page).status_code == 401
    assert client.post("/api/pages", json=page, headers=auth("reviewer-test-token")).status_code == 403
    created = client.post("/api/pages", json=page, headers=auth("editor-test-token"))
    assert created.status_code == 200
    page_id = created.json()["id"]
    assert client.delete(f"/api/pages/{page_id}", headers=auth("editor-test-token")).status_code == 403


def test_evidence_is_pending_until_named_reviewer_transition(client):
    page = client.post(
        "/api/pages",
        json={"slug": "evidence-page", "title": "Evidence review page", "meta_description": "x" * 60, "body_markdown": "word " * 320},
        headers=auth("editor-test-token"),
    ).json()
    claim = client.post(
        "/api/claims",
        json={"page_id": page["id"], "field": "identity", "statement": "A material identity claim.", "is_critical": True},
        headers=auth("editor-test-token"),
    ).json()
    evidence = client.post(
        "/api/evidence",
        json={
            "claim_id": claim["id"],
            "source": {"url": "https://example.com/source", "publisher": "Example", "authority": "primary", "retrieved_at": "2026-08-29T00:00:00Z"},
            "passage": "A captured supporting passage.",
        },
        headers=auth("editor-test-token"),
    )
    assert evidence.status_code == 200
    assert evidence.json()["status"] == "pending"
    evidence_id = evidence.json()["id"]

    assert client.put(f"/api/evidence/{evidence_id}?status=verified&reason=checked", headers=auth("editor-test-token")).status_code == 403
    reviewed = client.put(
        f"/api/evidence/{evidence_id}?status=verified&reason=checked%20against%20source",
        headers=auth("reviewer-test-token"),
    )
    assert reviewed.status_code == 200
    assert reviewed.json()["status"] == "verified"


def test_publish_requires_current_named_review(client):
    page = client.post(
        "/api/pages",
        json={"slug": "approval-page", "title": "Approval-gated content profile", "meta_description": "x" * 60, "body_markdown": "word " * 320},
        headers=auth("editor-test-token"),
    ).json()
    blocked = client.post(f"/api/pages/{page['id']}/publish", headers=auth("reviewer-test-token"))
    assert blocked.status_code == 422
    assert any("human reviewer approval" in item for item in blocked.json()["detail"]["failures"])

    review = client.post(
        f"/api/pages/{page['id']}/review",
        json={"decision": "approved", "reason": "Named review completed."},
        headers=auth("reviewer-test-token"),
    )
    assert review.status_code == 200
    assert review.json()["reviewer"] == "Test Reviewer"

    audit = client.get("/api/audit/events", headers=auth("admin-test-token"))
    assert audit.status_code == 200
    assert any(event["action"] == "page.review_approved" for event in audit.json())
