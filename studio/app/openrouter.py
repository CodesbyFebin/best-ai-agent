"""
Real OpenRouter HTTP client. If OPENROUTER_API_KEY is unset, every function here
returns an explicit "not_configured" result — it never fabricates a completion
or pretends to be connected. This is the one adapter in the system allowed to
talk to a paid third-party API, and it does so honestly about its own state.
"""
import os

import httpx

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def is_configured() -> bool:
    return bool(os.getenv("OPENROUTER_API_KEY"))


def status() -> dict:
    if not is_configured():
        return {"provider": "openrouter", "state": "not_configured", "model": None}
    return {
        "provider": "openrouter",
        "state": "configured",
        "model": os.getenv("OPENROUTER_MODEL", "anthropic/claude-3.5-sonnet"),
    }


async def generate_draft(prompt: str, system: str | None = None) -> dict:
    """
    Calls OpenRouter for real. Returns {"state": "not_configured"} if no API key
    is present — the caller (generation job) must handle that state explicitly
    and must not synthesize fake draft text as a fallback.
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        return {"state": "not_configured", "content": None, "error": None}

    model = os.getenv("OPENROUTER_MODEL", "anthropic/claude-3.5-sonnet")
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={"model": model, "messages": messages},
            )
            resp.raise_for_status()
            data = resp.json()
            content = data["choices"][0]["message"]["content"]
            return {"state": "ok", "content": content, "error": None, "model": model}
    except httpx.HTTPStatusError as exc:
        return {"state": "error", "content": None, "error": f"HTTP {exc.response.status_code}: {exc.response.text[:300]}"}
    except Exception as exc:  # noqa: BLE001 — surface any failure honestly to the caller
        return {"state": "error", "content": None, "error": str(exc)}
