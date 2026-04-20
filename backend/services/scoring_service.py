from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

from backend.config import settings
from backend.models.schemas import ScoreResult
from backend.roles.prompts import SCORING_PROMPT


def _make_scoring_llm():
    primary = ChatAnthropic(
        model="claude-sonnet-4-5",
        api_key=settings.ANTHROPIC_API_KEY,
        max_tokens=1024,
    )
    fallback = ChatOpenAI(
        model="gpt-4o-mini",
        api_key=settings.OPENAI_API_KEY,
        max_tokens=1024,
    )
    return primary.with_fallbacks([fallback]).with_structured_output(ScoreResult)


async def score_argument(role: str, argument: str, case_context: str) -> ScoreResult:
    llm = _make_scoring_llm()

    system_prompt = SCORING_PROMPT.replace("{role}", role).replace(
        "{case_context}", case_context
    ).replace("{argument}", argument)

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=f"Please evaluate this {role} argument: {argument}"),
    ]

    result = await llm.ainvoke(messages)
    return result
