"""
Deterministic quality scoring. Every function here computes a score from real
page/claim/evidence state already stored in the database — nothing is randomized
or hardcoded to look good. A page with no claims, no evidence, and no body text
scores near zero, honestly.
"""
import json
import hashlib
import re
from dataclasses import dataclass, field

from sqlalchemy.orm import Session

from app.models import Page, PageApproval

WEIGHTS = {
    "intent": 15,
    "factual_accuracy": 15,
    "original_information": 15,
    "answerability": 10,
    "entity_completeness": 10,
    "evidence_score": 10,
    "internal_linking": 8,
    "ux_readability": 7,
    "technical_seo": 5,
    "schema_accuracy": 5,
}

MIN_WORD_COUNT = 300
MIN_QUALITY_TO_PUBLISH = 85.0
MIN_EVIDENCE_COVERAGE = 0.70


def page_body_sha256(page: Page) -> str:
    return hashlib.sha256((page.body_markdown or "").encode("utf-8")).hexdigest()


def has_current_human_approval(db: Session, page: Page) -> bool:
    return (
        db.query(PageApproval)
        .filter(
            PageApproval.page_id == page.id,
            PageApproval.body_sha256 == page_body_sha256(page),
            PageApproval.decision == "approved",
            PageApproval.actor_role.in_(("reviewer", "admin")),
        )
        .order_by(PageApproval.created_at.desc())
        .first()
        is not None
    )


@dataclass
class QualityResult:
    scores: dict = field(default_factory=dict)
    total: float = 0.0
    gate_passed: bool = False
    gate_failures: list = field(default_factory=list)


def _score_intent(page: Page) -> float:
    """Does the page declare what question it answers? Title + meta + a body are the minimum signal."""
    points = 0.0
    if page.title and len(page.title) >= 15:
        points += 5
    if page.meta_description and 50 <= len(page.meta_description) <= 160:
        points += 5
    if page.body_markdown and len(page.body_markdown.strip()) > 0:
        points += 5
    return min(points, WEIGHTS["intent"])


def _score_factual_accuracy(page: Page) -> float:
    """Fraction of claims (weighted toward critical ones) that carry verified evidence."""
    if not page.claims:
        return 0.0
    critical = [c for c in page.claims if c.is_critical]
    non_critical = [c for c in page.claims if not c.is_critical]
    critical_ok = sum(1 for c in critical if c.is_supported)
    non_critical_ok = sum(1 for c in non_critical if c.is_supported)
    total = len(page.claims)
    weighted = critical_ok * 2 + non_critical_ok  # critical claims count double
    max_weighted = len(critical) * 2 + len(non_critical)
    if max_weighted == 0:
        return 0.0
    ratio = weighted / max_weighted
    return round(ratio * WEIGHTS["factual_accuracy"], 2)


def _score_original_information(page: Page) -> float:
    """Rewards concrete, specific data (numbers, dated facts) over generic prose."""
    if not page.body_markdown:
        return 0.0
    body = page.body_markdown
    numeric_facts = len(re.findall(r"\b\d[\d,.]*\s?(%|GB|MB|ms|/mo|USD|\$|₹|tokens?)\b", body, re.IGNORECASE))
    dated_facts = len(re.findall(r"\b(20\d{2}-\d{2}-\d{2}|20\d{2})\b", body))
    signal = numeric_facts + dated_facts
    # 1 point per concrete fact, capped at the dimension weight
    return min(float(signal), WEIGHTS["original_information"])


def _score_answerability(page: Page) -> float:
    """Does the page contain a direct-answer or FAQ-style block a search/AI engine can lift?"""
    if not page.body_markdown:
        return 0.0
    body = page.body_markdown.lower()
    points = 0.0
    if re.search(r"^#{2,3}\s*(direct answer|tl;dr|quick answer)", body, re.MULTILINE):
        points += 5
    faq_headings = len(re.findall(r"^#{2,3}\s*(what|how|why|when|is|does|can|are)\b", body, re.MULTILINE))
    points += min(faq_headings * 1.5, 5)
    return min(points, WEIGHTS["answerability"])


def _score_entity_completeness(page: Page) -> float:
    entity = page.primary_entity
    if not entity:
        return 0.0
    fields = [entity.name, entity.summary, entity.homepage_url, entity.entity_type, entity.verification_state != "unknown"]
    filled = sum(1 for f in fields if f)
    return round((filled / len(fields)) * WEIGHTS["entity_completeness"], 2)


def _score_evidence(page: Page) -> float:
    coverage = _evidence_coverage(page)
    return round(coverage * WEIGHTS["evidence_score"], 2)


def _evidence_coverage(page: Page) -> float:
    if not page.claims:
        return 0.0
    supported = sum(1 for c in page.claims if c.is_supported)
    return supported / len(page.claims)


def _score_internal_linking(page: Page, known_slugs: set[str]) -> float:
    if not page.body_markdown:
        return 0.0
    links = re.findall(r"\]\(/([a-z0-9\-\/]+)\)", page.body_markdown)
    internal_hits = sum(1 for link in links if link.strip("/") in known_slugs)
    return min(float(internal_hits) * 2, WEIGHTS["internal_linking"])


def _score_ux_readability(page: Page) -> float:
    if not page.body_markdown:
        return 0.0
    body = page.body_markdown
    sentences = re.split(r"(?<=[.!?])\s+", body)
    sentences = [s for s in sentences if s.strip()]
    if not sentences:
        return 0.0
    avg_len = sum(len(s.split()) for s in sentences) / len(sentences)
    headings = len(re.findall(r"^#{2,4}\s", body, re.MULTILINE))
    points = 0.0
    if 10 <= avg_len <= 24:
        points += 4
    elif avg_len <= 30:
        points += 2
    if headings >= 3:
        points += 3
    elif headings >= 1:
        points += 1.5
    return min(points, WEIGHTS["ux_readability"])


def _score_technical_seo(page: Page) -> float:
    points = 0.0
    if page.title and 15 <= len(page.title) <= 70:
        points += 2
    if page.meta_description and 50 <= len(page.meta_description) <= 160:
        points += 2
    if page.slug and re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", page.slug):
        points += 1
    return min(points, WEIGHTS["technical_seo"])


def _score_schema_accuracy(page: Page) -> float:
    # We can only emit accurate JSON-LD if there is a primary entity with a real
    # identity (name, type) to describe. No entity => no honest schema to emit.
    entity = page.primary_entity
    if not entity or not entity.name or not entity.entity_type:
        return 0.0
    return float(WEIGHTS["schema_accuracy"])


def compute_quality(db: Session, page: Page) -> QualityResult:
    known_slugs = {p.slug for p in db.query(Page.slug).all()}

    scores = {
        "intent": _score_intent(page),
        "factual_accuracy": _score_factual_accuracy(page),
        "original_information": _score_original_information(page),
        "answerability": _score_answerability(page),
        "entity_completeness": _score_entity_completeness(page),
        "evidence_score": _score_evidence(page),
        "internal_linking": _score_internal_linking(page, known_slugs),
        "ux_readability": _score_ux_readability(page),
        "technical_seo": _score_technical_seo(page),
        "schema_accuracy": _score_schema_accuracy(page),
    }
    total = round(sum(scores.values()), 2)

    result = QualityResult(scores=scores, total=total)
    result.gate_failures = evaluate_publish_gate(db, page, scores, total)
    result.gate_passed = len(result.gate_failures) == 0
    return result


def evaluate_publish_gate(db: Session, page: Page, scores: dict, total: float) -> list[str]:
    """The AND-chain of hard requirements. Every item here must be empty to publish."""
    failures: list[str] = []

    if total < MIN_QUALITY_TO_PUBLISH:
        failures.append(f"Quality score {total} is below the {MIN_QUALITY_TO_PUBLISH} publish threshold.")

    coverage = _evidence_coverage(page)
    if coverage < MIN_EVIDENCE_COVERAGE:
        failures.append(
            f"Evidence coverage {coverage:.0%} is below the {MIN_EVIDENCE_COVERAGE:.0%} minimum."
        )

    unsupported_critical = [c for c in page.claims if c.is_critical and not c.is_supported]
    if unsupported_critical:
        failures.append(
            f"{len(unsupported_critical)} critical claim(s) have no verified evidence: "
            + ", ".join(c.field for c in unsupported_critical)
        )

    word_count = len((page.body_markdown or "").split())
    if word_count < MIN_WORD_COUNT:
        failures.append(f"Word count {word_count} is below the {MIN_WORD_COUNT}-word minimum.")

    if not page.title:
        failures.append("Missing page title.")
    if not page.meta_description:
        failures.append("Missing meta description.")

    duplicate = (
        db.query(Page)
        .filter(Page.id != page.id, Page.title == page.title, Page.title.isnot(None))
        .first()
    )
    if duplicate:
        failures.append(f"Title duplicates page id={duplicate.id} ({duplicate.slug}).")

    if not has_current_human_approval(db, page):
        failures.append("Current page body has no named human reviewer approval.")

    return failures


def gate_failures_json(failures: list[str]) -> str:
    return json.dumps(failures)
