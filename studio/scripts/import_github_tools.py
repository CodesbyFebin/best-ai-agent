"""
Imports REAL AI-agent-tool repositories from the live GitHub Search API.
Each imported entity carries its actual star count, license, and repo URL as
returned by GitHub right now — nothing here is fabricated or pre-canned.

Respects GitHub's public rate limit (60 req/hr unauthenticated, 5000/hr with
GITHUB_TOKEN set). Skips repos already present (matched by repo_url) so it's
safe to re-run to top up toward a larger target count over multiple runs.

Usage:
    python scripts/import_github_tools.py [--limit 100] [--query "ai agent"]
"""
import argparse
import os
import re
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db import SessionLocal, init_db  # noqa: E402
from app.models import Entity  # noqa: E402

GITHUB_SEARCH_URL = "https://api.github.com/search/repositories"

QUERIES = [
    "ai agent framework",
    "autonomous agent llm",
    "mcp server",
    "model context protocol",
    "agentic workflow",
    "llm orchestration",
]


def slugify(name: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", name.lower()).strip("-")
    return s


def fetch_page(query: str, page: int, headers: dict) -> dict:
    with httpx.Client(timeout=30) as client:
        resp = client.get(
            GITHUB_SEARCH_URL,
            params={"q": query, "sort": "stars", "order": "desc", "per_page": 30, "page": page},
            headers=headers,
        )
        if resp.status_code == 403:
            reset = resp.headers.get("x-ratelimit-reset")
            raise RuntimeError(f"GitHub rate limit hit (resets at epoch {reset}). Set GITHUB_TOKEN to raise the limit.")
        resp.raise_for_status()
        return resp.json()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=100, help="max repos to import this run")
    parser.add_argument("--query", type=str, default=None, help="single search query override")
    args = parser.parse_args()

    token = os.getenv("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    else:
        print("WARNING: GITHUB_TOKEN not set — limited to 60 requests/hour by GitHub's public rate limit.")

    init_db()
    db = SessionLocal()

    existing_repo_urls = {e.repo_url for e in db.query(Entity.repo_url).all() if e.repo_url}
    existing_slugs = {e.slug for e in db.query(Entity.slug).all()}

    queries = [args.query] if args.query else QUERIES
    imported = 0
    skipped_existing = 0

    for query in queries:
        if imported >= args.limit:
            break
        page = 1
        while imported < args.limit:
            try:
                data = fetch_page(query, page, headers)
            except RuntimeError as exc:
                print(f"STOPPED: {exc}")
                db.commit()
                db.close()
                print(f"Imported {imported} real repositories before hitting the rate limit.")
                return

            items = data.get("items", [])
            if not items:
                break

            for repo in items:
                if imported >= args.limit:
                    break
                repo_url = repo["html_url"]
                if repo_url in existing_repo_urls:
                    skipped_existing += 1
                    continue

                slug = slugify(repo["full_name"])
                base_slug = slug
                n = 2
                while slug in existing_slugs:
                    slug = f"{base_slug}-{n}"
                    n += 1

                entity = Entity(
                    slug=slug,
                    name=repo["name"],
                    entity_type="tool",
                    summary=(repo.get("description") or "")[:500],
                    homepage_url=repo.get("homepage") or repo_url,
                    repo_url=repo_url,
                    stars=repo.get("stargazers_count"),
                    license=(repo.get("license") or {}).get("spdx_id") if repo.get("license") else None,
                    source_of_record="github-search-api",
                    verification_state="source-linked",  # identity confirmed by GitHub API, not yet fact-checked
                )
                db.add(entity)
                existing_repo_urls.add(repo_url)
                existing_slugs.add(slug)
                imported += 1

            page += 1
            time.sleep(1.2)  # be polite to the API regardless of rate-limit headroom

    db.commit()
    total_tools = db.query(Entity).filter(Entity.entity_type == "tool").count()
    db.close()

    print(f"Imported {imported} new real GitHub repositories this run (skipped {skipped_existing} already present).")
    print(f"Total 'tool' entities in database now: {total_tools}")
    print("Re-run this script (it will skip duplicates) to keep growing toward a larger target count.")


if __name__ == "__main__":
    main()
