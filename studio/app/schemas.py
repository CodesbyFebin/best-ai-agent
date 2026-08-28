from datetime import datetime

from pydantic import BaseModel


class SourceOut(BaseModel):
    id: int
    url: str
    publisher: str
    source_type: str
    authority: str
    retrieved_at: datetime | None
    model_config = {"from_attributes": True}


class EvidenceOut(BaseModel):
    id: int
    claim_id: int
    source: SourceOut | None
    passage: str | None
    retrieved_at: datetime | None
    status: str
    model_config = {"from_attributes": True}


class ClaimOut(BaseModel):
    id: int
    field: str
    statement: str
    is_critical: bool
    is_supported: bool
    evidence: list[EvidenceOut] = []
    model_config = {"from_attributes": True}


class EntityIn(BaseModel):
    slug: str
    name: str
    entity_type: str
    summary: str | None = None
    homepage_url: str | None = None
    repo_url: str | None = None
    stars: int | None = None
    license: str | None = None
    source_of_record: str | None = None
    verification_state: str = "unknown"


class EntityOut(EntityIn):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}


class PageIn(BaseModel):
    slug: str
    page_type: str = "article"
    title: str | None = None
    meta_description: str | None = None
    primary_entity_id: int | None = None
    body_markdown: str | None = None


class PageOut(BaseModel):
    id: int
    slug: str
    page_type: str
    title: str | None
    meta_description: str | None
    status: str
    quality_score: float | None
    word_count: int
    created_at: datetime
    updated_at: datetime
    published_at: datetime | None
    model_config = {"from_attributes": True}


class PageDetailOut(PageOut):
    body_markdown: str | None
    claims: list[ClaimOut] = []
    model_config = {"from_attributes": True}


class QualityOut(BaseModel):
    scores: dict[str, float]
    total: float
    gate_passed: bool
    gate_failures: list[str]
