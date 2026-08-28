"""
Real tests against the actual quality engine and publish gate — no mocking of
the scoring functions themselves. Uses an in-memory SQLite database per test.
"""
import sys
from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db import Base  # noqa: E402
from app.models import Claim, Entity, Evidence, Page, PageApproval, Source  # noqa: E402
from app.quality import compute_quality, evaluate_publish_gate, page_body_sha256  # noqa: E402


@pytest.fixture()
def db():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()


def make_entity(db, slug="test-entity"):
    e = Entity(slug=slug, name="Test Entity", entity_type="agent", summary="A test entity.", homepage_url="https://example.com", verification_state="verified")
    db.add(e)
    db.flush()
    return e


def test_empty_page_scores_near_zero_and_fails_gate(db):
    page = Page(slug="empty-page", title=None, meta_description=None, body_markdown=None)
    db.add(page)
    db.flush()

    result = compute_quality(db, page)

    assert result.total < 10
    assert result.gate_passed is False
    assert any("Word count" in f for f in result.gate_failures)
    assert any("Missing page title" in f for f in result.gate_failures)


def test_page_with_unsupported_critical_claim_fails_gate(db):
    entity = make_entity(db)
    page = Page(
        slug="thin-claims",
        title="A page with an unverified claim",
        meta_description="x" * 60,
        primary_entity_id=entity.id,
        body_markdown="word " * 400,
    )
    db.add(page)
    db.flush()

    claim = Claim(page_id=page.id, entity_id=entity.id, field="pricing", statement="Costs $10/mo.", is_critical=True)
    db.add(claim)
    db.flush()
    # no evidence attached — this claim is unsupported

    result = compute_quality(db, page)

    assert result.gate_passed is False
    assert any("critical claim" in f for f in result.gate_failures)
    assert result.scores["factual_accuracy"] == 0.0


def test_fully_supported_page_can_pass_the_gate(db):
    entity = make_entity(db)
    page = Page(
        slug="well-supported",
        title="A page with fully verified claims and real content",
        meta_description="An evidence-backed profile with verified claims and enough real content to pass review.",
        primary_entity_id=entity.id,
        body_markdown=(
            "## Direct answer\n\n" + ("This is real, substantive prose about the entity. " * 60) +
            "\n\n## What it does\n\n" + ("More specific detail with numbers like 42% and dates like 2026-01-01. " * 10) +
            "\n\n## FAQ\n\n### What is it?\n\nIt is a thing.\n"
        ),
    )
    db.add(page)
    db.flush()

    claim = Claim(page_id=page.id, entity_id=entity.id, field="identity", statement="Verified identity.", is_critical=True)
    db.add(claim)
    db.flush()

    source = Source(url="https://example.com/docs", publisher="Example", source_type="official-documentation", authority="primary")
    db.add(source)
    db.flush()

    evidence = Evidence(claim_id=claim.id, source_id=source.id, passage="Supporting passage.", status="verified")
    db.add(evidence)
    db.flush()

    result = compute_quality(db, page)

    assert result.scores["factual_accuracy"] == 15.0  # sole critical claim is fully supported
    assert result.scores["evidence_score"] == 10.0     # 100% coverage
    # Whether the *total* clears 85 depends on prose quality too — but nothing
    # here should be gated on evidence or word count any more:
    assert not any("Word count" in f for f in result.gate_failures)
    assert not any("critical claim" in f for f in result.gate_failures)
    assert not any("Evidence coverage" in f for f in result.gate_failures)


def test_duplicate_title_blocks_publish(db):
    entity = make_entity(db)
    p1 = Page(slug="page-one", title="Duplicate Title", meta_description="x" * 60, primary_entity_id=entity.id, body_markdown="word " * 400)
    p2 = Page(slug="page-two", title="Duplicate Title", meta_description="x" * 60, primary_entity_id=entity.id, body_markdown="word " * 400)
    db.add_all([p1, p2])
    db.flush()

    failures = evaluate_publish_gate(db, p2, {}, 100.0)  # total forced high to isolate the duplicate check

    assert any("duplicates page id" in f for f in failures)


def test_current_human_approval_is_required_and_bound_to_body(db):
    entity = make_entity(db)
    page = Page(
        slug="review-bound",
        title="A human-reviewed evidence profile",
        meta_description="A sufficiently descriptive summary for the human review binding test case.",
        primary_entity_id=entity.id,
        body_markdown="word " * 400,
    )
    db.add(page)
    db.flush()

    before = compute_quality(db, page)
    assert any("human reviewer approval" in f for f in before.gate_failures)

    db.add(PageApproval(
        page_id=page.id,
        body_sha256=page_body_sha256(page),
        decision="approved",
        actor_name="Named Reviewer",
        actor_role="reviewer",
        reason="Reviewed against the attached receipts.",
    ))
    db.flush()
    approved = compute_quality(db, page)
    assert not any("human reviewer approval" in f for f in approved.gate_failures)

    page.body_markdown += " changed"
    db.flush()
    changed = compute_quality(db, page)
    assert any("human reviewer approval" in f for f in changed.gate_failures)
