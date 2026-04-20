import asyncio
from typing import AsyncGenerator
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import httpx

from backend.config import settings
from backend.roles.prompts import (
    LAWYER_DEFENSE_PROMPT,
    LAWYER_PROSECUTION_PROMPT,
    JUDGE_PROMPT,
    WITNESS_PROMPT,
)

ROLE_PROMPTS = {
    "defense": LAWYER_DEFENSE_PROMPT,
    "prosecution": LAWYER_PROSECUTION_PROMPT,
    "judge": JUDGE_PROMPT,
    "witness": WITNESS_PROMPT,
}

PROVIDER_MAP = {
    "defense": "Anthropic",
    "prosecution": "OpenAI",
    "judge": "Ollama",
    "witness": "Anthropic",
    "scoring": "Anthropic",
}

_ollama_available: bool | None = None


async def is_ollama_available() -> bool:
    if not settings.OLLAMA_BASE_URL:
        return False
    try:
        async with httpx.AsyncClient(timeout=2.0) as client:
            r = await client.get(f"{settings.OLLAMA_BASE_URL}/api/tags")
            return r.status_code == 200
    except Exception:
        return False


def _make_anthropic(model: str = "claude-sonnet-4-5") -> ChatAnthropic:
    return ChatAnthropic(
        model=model,
        api_key=settings.ANTHROPIC_API_KEY,
        max_tokens=2048,
    )


def _make_openai(model: str = "gpt-4o-mini") -> ChatOpenAI:
    return ChatOpenAI(
        model=model,
        api_key=settings.OPENAI_API_KEY,
        max_tokens=2048,
    )


def _make_ollama(model: str = "llama3.2") -> ChatOllama:
    return ChatOllama(
        model=model,
        base_url=settings.OLLAMA_BASE_URL,
    )


def _build_llm_with_fallback(role: str, ollama_ok: bool):
    if role == "defense":
        primary = _make_anthropic()
        fallback = _make_openai()
        return primary.with_fallbacks([fallback])
    elif role == "prosecution":
        primary = _make_openai()
        fallback = _make_anthropic()
        return primary.with_fallbacks([fallback])
    elif role == "judge":
        if ollama_ok:
            primary = _make_ollama()
            fallback = _make_anthropic()
            return primary.with_fallbacks([fallback])
        else:
            primary = _make_anthropic()
            fallback = _make_openai()
            return primary.with_fallbacks([fallback])
    elif role == "witness":
        primary = _make_anthropic()
        fallback = _make_openai()
        return primary.with_fallbacks([fallback])
    else:
        primary = _make_anthropic()
        fallback = _make_openai()
        return primary.with_fallbacks([fallback])


def _history_to_messages(history: list[dict]) -> list:
    messages = []
    for entry in history:
        role = entry.get("role", "")
        content = entry.get("content", "")
        if role in ("defense", "prosecution", "judge", "witness", "user"):
            messages.append(HumanMessage(content=f"[{role.upper()}]: {content}"))
        else:
            messages.append(AIMessage(content=content))
    return messages


async def invoke_role_stream(
    role: str,
    message: str,
    history: list[dict],
    case_context: str,
) -> AsyncGenerator[str, None]:
    ollama_ok = await is_ollama_available()

    system_template = ROLE_PROMPTS.get(role, JUDGE_PROMPT)
    system_content = system_template.replace("{context}", case_context)

    history_messages = _history_to_messages(history)

    messages = [SystemMessage(content=system_content)] + history_messages + [HumanMessage(content=message)]

    llm = _build_llm_with_fallback(role, ollama_ok)

    async for chunk in llm.astream(messages):
        if hasattr(chunk, "content") and chunk.content:
            yield chunk.content


def get_provider_name(role: str) -> str:
    return PROVIDER_MAP.get(role, "Anthropic")
