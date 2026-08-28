"""
Data model for the research → claim → evidence → source pipeline, and the
entity → relationship knowledge graph. See docs in README.md for the
architectural rationale (pages hold claims; claims are backed by evidence;
evidence points to a source; entities relate to other entities).
"""
import datetime as dt

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.db import Base


def now() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)


class Source(Base):
    """A first-party or independent document a claim can be verified against."""

    __tablename__ = "sources"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False, unique=True)
    publisher = Column(String, nullable=False)
    source_type = Column(
        String, nullable=False, default="unknown"
    )  # official-docs | official-repo | official-pricing | community | press
    authority = Column(String, nullable=False, default="secondary")  # primary | secondary | community
    retrieved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=now)

    evidence = relationship("Evidence", back_populates="source")


class Entity(Base):
    """A node in the knowledge graph: an agent, model, framework, company, feature, etc."""

    __tablename__ = "entities"

    id = Column(Integer, primary_key=True)
    slug = Column(String, nullable=False, unique=True, index=True)
    name = Column(String, nullable=False)
    entity_type = Column(String, nullable=False, index=True)  # agent | model | framework | company | tool | feature
    summary = Column(Text, nullable=True)
    homepage_url = Column(String, nullable=True)
    repo_url = Column(String, nullable=True)
    stars = Column(Integer, nullable=True)  # real GitHub stargazer count when imported from GitHub
    license = Column(String, nullable=True)
    source_of_record = Column(
        String, nullable=True
    )  # where this entity's identity facts came from, e.g. "github-api" or "manual-import:bestaiagent-production"
    verification_state = Column(String, nullable=False, default="unknown")  # verified | source-linked | unknown
    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)

    claims = relationship("Claim", back_populates="entity")


class EntityRelationship(Base):
    """A directed edge in the knowledge graph, e.g. (agent) --uses--> (model)."""

    __tablename__ = "entity_relationships"
    __table_args__ = (UniqueConstraint("from_entity_id", "relation", "to_entity_id", name="uq_relationship"),)

    id = Column(Integer, primary_key=True)
    from_entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    to_entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    relation = Column(String, nullable=False)  # uses | competes_with | built_by | integrates_with | forked_from
    created_at = Column(DateTime, default=now)

    from_entity = relationship("Entity", foreign_keys=[from_entity_id])
    to_entity = relationship("Entity", foreign_keys=[to_entity_id])


class Page(Base):
    """A publishable URL. Content lives in body_markdown; facts backing it live in Claims."""

    __tablename__ = "pages"

    id = Column(Integer, primary_key=True)
    slug = Column(String, nullable=False, unique=True, index=True)
    page_type = Column(String, nullable=False, default="article")  # article | comparison | tool-profile | pillar
    title = Column(String, nullable=True)
    meta_description = Column(String, nullable=True)
    primary_entity_id = Column(Integer, ForeignKey("entities.id"), nullable=True)
    body_markdown = Column(Text, nullable=True)
    word_count = Column(Integer, nullable=False, default=0)
    status = Column(String, nullable=False, default="draft")  # draft | review | published | rejected
    quality_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, default=now, onupdate=now)
    published_at = Column(DateTime, nullable=True)

    primary_entity = relationship("Entity")
    claims = relationship("Claim", back_populates="page", cascade="all, delete-orphan")
    quality_scores = relationship("QualityScore", back_populates="page", cascade="all, delete-orphan")
    publication_events = relationship("PublicationEvent", back_populates="page", cascade="all, delete-orphan")


class Claim(Base):
    """
    A single factual assertion needing evidence. Usually made on a page, but
    page_id may be null for an entity-level identity claim imported before any
    page cites it (e.g. "this repository is the real upstream for X").
    """

    __tablename__ = "claims"

    id = Column(Integer, primary_key=True)
    page_id = Column(Integer, ForeignKey("pages.id"), nullable=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=True)
    field = Column(String, nullable=False)  # e.g. "pricing", "license", "star_count"
    statement = Column(Text, nullable=False)
    is_critical = Column(Boolean, nullable=False, default=False)  # blocks publish if unsupported
    created_at = Column(DateTime, default=now)

    page = relationship("Page", back_populates="claims")
    entity = relationship("Entity")
    evidence = relationship("Evidence", back_populates="claim", cascade="all, delete-orphan")

    @property
    def is_supported(self) -> bool:
        return any(e.status == "verified" for e in self.evidence)


class Evidence(Base):
    """A receipt tying a claim to a source, with a retrieval date and passage."""

    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    source_id = Column(Integer, ForeignKey("sources.id"), nullable=False)
    passage = Column(Text, nullable=True)  # exact quoted supporting text, when available
    retrieved_at = Column(DateTime, nullable=True)
    status = Column(String, nullable=False, default="pending")  # verified | pending | stale | rejected
    created_at = Column(DateTime, default=now)

    claim = relationship("Claim", back_populates="evidence")
    source = relationship("Source", back_populates="evidence")


class QualityScore(Base):
    """A stored, reproducible quality assessment for one page at one point in time."""

    __tablename__ = "quality_scores"

    id = Column(Integer, primary_key=True)
    page_id = Column(Integer, ForeignKey("pages.id"), nullable=False)
    intent = Column(Float, default=0)
    factual_accuracy = Column(Float, default=0)
    original_information = Column(Float, default=0)
    answerability = Column(Float, default=0)
    entity_completeness = Column(Float, default=0)
    evidence_score = Column(Float, default=0)
    internal_linking = Column(Float, default=0)
    ux_readability = Column(Float, default=0)
    technical_seo = Column(Float, default=0)
    schema_accuracy = Column(Float, default=0)
    total = Column(Float, default=0)
    gate_passed = Column(Boolean, default=False)
    gate_failures = Column(Text, nullable=True)  # JSON-encoded list of human-readable reasons
    created_at = Column(DateTime, default=now)

    page = relationship("Page", back_populates="quality_scores")


class PublicationEvent(Base):
    """Audit log entry: every publish/unpublish/reject action, with the gate result attached."""

    __tablename__ = "publication_events"

    id = Column(Integer, primary_key=True)
    page_id = Column(Integer, ForeignKey("pages.id"), nullable=False)
    action = Column(String, nullable=False)  # published | rejected | unpublished
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now)

    page = relationship("Page", back_populates="publication_events")


class GenerationJob(Base):
    """A queued unit of work: research, generate, validate, or publish a page."""

    __tablename__ = "generation_jobs"

    id = Column(Integer, primary_key=True)
    page_id = Column(Integer, ForeignKey("pages.id"), nullable=True)
    job_type = Column(String, nullable=False)  # research | generate | validate | publish
    status = Column(String, nullable=False, default="queued")  # queued | running | done | failed
    log = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now)
    finished_at = Column(DateTime, nullable=True)


class PageApproval(Base):
    """Human review bound to the exact page body that was approved."""

    __tablename__ = "page_approvals"

    id = Column(Integer, primary_key=True)
    page_id = Column(Integer, ForeignKey("pages.id"), nullable=False, index=True)
    body_sha256 = Column(String, nullable=False)
    decision = Column(String, nullable=False)  # approved | rejected
    actor_name = Column(String, nullable=False)
    actor_role = Column(String, nullable=False)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now, nullable=False)


class AuditEvent(Base):
    """Append-only record of security-sensitive state transitions."""

    __tablename__ = "audit_events"

    id = Column(Integer, primary_key=True)
    actor_name = Column(String, nullable=False)
    actor_role = Column(String, nullable=False)
    action = Column(String, nullable=False, index=True)
    object_type = Column(String, nullable=False)
    object_id = Column(String, nullable=False)
    prior_state = Column(Text, nullable=True)
    new_state = Column(Text, nullable=True)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=now, nullable=False)
