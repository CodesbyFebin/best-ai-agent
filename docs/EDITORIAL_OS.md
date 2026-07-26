# Editorial OS - System Specification

**Phase:** 15  
**Status:** Not Implemented (Future)  
**Priority:** High (quality control before publication)  
**Dependencies:** P14 (Content OS) complete

---

## 1. Overview

Editorial OS is the human-in-the-loop content review, approval, and versioning system that ensures all published content meets quality standards before going live.

---

## 2. Core Components

### 2.1 Review Queue

**Purpose:** Centralized dashboard for editors to review pending content.

**Features:**
- Filter by content type, priority, age
- Bulk actions (approve, reject, reassign)
- SLA tracking (time in queue)
- Assignment to specific editors
- Priority boosting for urgent content

**Queue Table:**
```typescript
interface ReviewItem {
  id: string;
  contentId: string;
  title: string;
  type: 'review' | 'comparison' | 'pricing' | 'alternatives';
  author: string;      // content creator (human or AI)
  submittedAt: Date;
  priority: 1-5;
  slaDeadline: Date;   // e.g., 24h from submission
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'needs_revision';
  assignedTo?: string; // editor email/userId
}
```

---

### 2.2 Annotation System

**Purpose:** Inline commenting on content drafts.

**Features:**
- Text selection → add comment
- Comment threads (reply, resolve)
- @mentions to notify other editors
- Comment types: question, suggestion, correction, question
- Resolution tracking

**Data Model:**
```typescript
interface Annotation {
  id: string;
  contentId: string;
  quote: string;           // highlighted text
  startOffset: number;
  endOffset: number;
  comment: string;
  author: string;
  createdAt: Date;
  resolved: boolean;
  resolvedBy?: string;
  replies?: AnnotationReply[];
}
```

---

### 2.3 Approval Workflow

**Purpose:** Formal review process with defined states.

**States:**
```
draft → submitted → in_review → approved → published
                    ↘ rejected (archived)
                    ↘ needs_revision → draft
```

**Transition Rules:**
- `draft` → `submitted`: Author clicks submit
- `submitted` → `in_review`: Auto-assigned or manual pick
- `in_review` → `approved`: Editor approves (may require 2+ approvals for CRITICAL content)
- `in_review` → `rejected`: Editor rejects with reason
- `in_review` → `needs_revision`: Editor requests changes
- `needs_revision` → `draft`: Author revises and resubmits

**Multi-Approval Configuration:**
- STANDARD content: 1 editor approval
- CRITICAL content: 2+ editor approvals (different people)
- COMPARISON content: 1 editor + 1 subject matter expert

---

### 2.4 Version History

**Purpose:** Track all changes to content over time.

**Features:**
- Snapshot on every state transition
- Diff view between versions
- Rollback to any previous version
- Author attribution per change
- Change summary (what changed, who changed)

**Data Model:**
```typescript
interface ContentVersion {
  id: string;
  contentId: string;
  version: number;  // 1, 2, 3...
  state: ContentState;
  content: string;  // full markdown/HTML
  evidenceIds: string[];
  changes: Change[];
  author: string;
  createdAt: Date;
}

interface Change {
  field: string;     // 'content', 'evidence', 'title', etc.
  oldValue: string;
  newValue: string;
}
```

---

### 2.5 Change Notifications

**Purpose:** Keep team informed of important events.

**Triggers:**
- Content submitted → notify assigned editor (or editor pool)
- Review overdue → escalate to senior editor
- Content rejected → notify author with feedback
- Content approved → notify author + next stage (publishing)
- Version published → notify marketing/social team (optional)

**Channels:**
- Email (primary)
- Slack/Discord webhook (optional)
- In-app notification bell

---

### 2.6 Quality Metrics Dashboard

**Purpose:** Track editorial performance and content quality.

**Metrics:**
- **Throughput:** Items reviewed per day/week
- **SLA Compliance:** % reviewed within 24h
- **Quality Scores:** Average quality score of approved content
- **Rejection Rate:** % of content rejected (target: 10-20%)
- **Revision Rate:** % needing revision before approval
- **Editor Workload:** Items per editor, avg review time

**Dashboard:**
- Real-time queue length
- Trending quality scores
- Top rejection reasons
- Editor leaderboard (items reviewed, quality output)

---

## 3. User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Author** | Submit drafts, revise content, view own items |
| **Editor** | Review queue, approve/reject, annotate, assign |
| **Senior Editor** | All editor + override approvals, set quality bars, access all queues |
| **Admin** | All + manage users, configure workflows, view all analytics |

---

## 4. Integration Points

### 4.1 Content OS (P14)
- Drafts appear in review queue automatically
- State transition: `draft` → `automated_validation` → `human_review`
- Quality scores from Content OS displayed

### 4.2 Publishing Engine (P16)
- Approved content (state `publish_approved`) auto-exported
- Publishing picks up content from `publish_approved` queue
- Publication event recorded → version history

### 4.3 Evidence System (P06)
- Evidence validation results shown to editors
- Editors can request additional evidence
- Evidence quality visible during review

### 4.4 Route Registry (P03)
- New routes created for new content types
- Editors can suggest canonical paths
- Route validation before publication

---

## 5. User Interface Mockups

### 5.1 Review Queue Page
```
[Search] [Filter: type▼] [Filter: priority▼] [Assign to me]

Table:
| Title | Type | Author | Submitted | Priority | SLA | Assigned | Actions |
|-------|------|--------|-----------|----------|-----|----------|---------|
| Cursor AI Review | review | AI-P14 | 2h ago | 3 | 22h left | Unassigned | [View] [Assign] |
| Claude vs GPT-4 | comparison | AI-P14 | 4h ago | 4 | 20h left | jane@... | [View] |
```

### 5.2 Review Detail Page
```
Left: Content preview (markdown rendered)
Right: Sidebar
  - Quality score: 88/100
  - Evidence: 12 claims (11 verified, 1 pending)
  - Word count: 2,450
  - Assign to: [dropdown]
  - SLA: Due in 22h
  
Annotations panel:
  - [Comment] "This claim needs source" – jane (2h ago) [Resolve]
  - [Suggestion] "Add pricing table" – mike (1h ago) [Resolve]

Actions:
  [Approve] [Request Revision] [Reject] [Save Draft]
```

### 5.3 Version History Modal
```
Version 3 (current) - Approved 2h ago by jane
Version 2 - Revised 4h ago by author
Version 1 - Submitted 6h ago
[Show diff between v2 and v3] [Rollback to v2] [Rollback to v1]
```

---

## 6. API Endpoints

### 6.1 Review Queue
```
GET    /api/editorial/queue          // My queue
GET    /api/editorial/queue/all      // All items (senior/ admin)
POST   /api/editorial/queue/assign  // Assign to editor
```

### 6.2 Content Review
```
GET    /api/editorial/content/:id    // View content + annotations
POST   /api/editorial/content/:id/approve
POST   /api/editorial/content/:id/reject  // with reason
POST   /api/editorial/content/:id/request-revision  // with feedback
```

### 6.3 Annotations
```
GET    /api/editorial/annotations/:contentId
POST   /api/editorial/annotations     // create
PUT    /api/editorial/annotations/:id/resolve
DELETE /api/editorial/annotations/:id
```

### 6.4 Versions
```
GET    /api/editorial/versions/:contentId
GET    /api/editorial/versions/:contentId/:versionId
POST   /api/editorial/versions/:contentId/rollback  // to specific version
```

### 6.5 Analytics
```
GET    /api/editorial/analytics/queue-health
GET    /api/editorial/analytics/editor-performance
GET    /api/editorial/analytics/quality-trends
```

---

## 7. Database Schema (if separate from main data)

```sql
TABLE review_queue (
  id UUID PRIMARY KEY,
  content_id UUID REFERENCES content(id),
  status TEXT CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'needs_revision')),
  priority INT,
  submitted_at TIMESTAMPTZ,
  sla_deadline TIMESTAMPTZ,
  assigned_to UUID REFERENCES users(id)
);

TABLE annotations (
  id UUID PRIMARY KEY,
  content_id UUID,
  quote TEXT,
  start_offset INT,
  end_offset INT,
  comment TEXT,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ,
  resolved BOOLEAN DEFAULT FALSE
);

TABLE content_versions (
  id UUID PRIMARY KEY,
  content_id UUID,
  version INT,
  state TEXT,  -- ContentState
  content TEXT,  -- full markdown
  evidence_ids JSONB,
  changes JSONB,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ
);

TABLE editorial_audit_log (
  id UUID PRIMARY KEY,
  content_id UUID,
  action TEXT,  -- 'approve', 'reject', 'assign', etc.
  details JSONB,
  editor_id UUID REFERENCES users(id),
  timestamp TIMESTAMPTZ
);
```

---

## 8. Email Templates

### 8.1 Assignment Notification
```
Subject: [Editorial] Content assigned: {title}

{editor},

Content "{title}" has been assigned to you for review.
Priority: {priority}
SLA: Due {slaDeadline}

View: {reviewUrl}

---
Editorial OS Team
```

### 8.2 Overdue Escalation
```
Subject: [URGENT] Overdue review: {title}

{editor},

This item is overdue by {overdueHours} hours.
It has been escalated to senior editor {seniorEditor}.

Review urgently: {reviewUrl}
```

### 8.3 Approval Notification
```
Subject: Content approved: {title}

{author},

Your content "{title}" has been approved and is ready for publication.

Next: Publishing engine will schedule it automatically.

Congratulations!
```

---

## 9. Implementation Phases

**P15-1: Database & Models** (Week 1)
- Set up review_queue table
- Define ContentVersion model
- Create annotation storage
- User role extensions

**P15-2: Backend API** (Week 1-2)
- Queue management endpoints
- CRUD for annotations
- Version history API
- Authentication/authorization

**P15-3: Frontend - Queue Dashboard** (Week 2-3)
- Review queue table with filters
- Assignment UI
- Bulk actions
- Real-time updates (WebSocket)

**P15-4: Frontend - Review Interface** (Week 3-4)
- Content preview (rendered markdown)
- Annotation sidebar
- Approve/Reject/Request Revision buttons
- SLA countdown timer

**P15-5: Annotations System** (Week 4-5)
- Text selection highlighting
- Comment threads
- @mentions with notifications
- Resolution workflow

**P15-6: Version History** (Week 5-6)
- Version list with diffs
- Rollback functionality
- Change logs
- Audit trail

**P15-7: Notifications** (Week 6-7)
- Email templates
- Slack integration (optional)
- In-app notifications
- Escalation logic

**P15-8: Analytics Dashboard** (Week 7-8)
- Throughput metrics
- SLA compliance charts
- Quality score trends
- Editor performance

---

## 10. Success Criteria

- **Queue Time:** 90% of content reviewed within 24h
- **Review Quality:** 95% approval rate (after revisions)
- **Editor Satisfaction:** > 4/5 rating on tool usability
- **Zero Lost Reviews:** All submissions tracked, none fall through cracks
- **Audit Trail:** 100% of actions logged and reversible

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Editor bottleneck (too few editors) | Auto-assignment, SLA monitoring, hire more |
| Inconsistent quality | Calibration sessions, style guide, quality bar enforcement |
| Annotation spam | Rate limiting, moderation tools |
| Version storage bloat | Compress old versions (>6 months), delete annotations on rollback |
| Notification fatigue | Digest mode, configurable thresholds |

---

**Status:** Specification complete, awaiting P14 implementation
