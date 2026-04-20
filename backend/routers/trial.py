import json
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

from backend.models.schemas import TurnRequest, VerdictRequest, ScoreRequest, VerdictResponse, ScoreResult
from backend.services import llm_service, rag_service, scoring_service
from backend.routers.cases import CASES
from backend.roles.prompts import VERDICT_PROMPT
from backend.config import settings
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


def _get_case_context(case_id: str) -> str:
    for case in CASES:
        if case.id == case_id:
            facts = "\n".join(f"- {f}" for f in case.facts)
            evidence = "\n".join(f"- {e}" for e in case.evidence)
            return f"Υπόθεση: {case.title}\n\nΓεγονότα:\n{facts}\n\nΑποδεικτικά στοιχεία:\n{evidence}"
    return ""


@router.post("/turn")
@limiter.limit("30/minute")
async def trial_turn(request: Request, turn_request: TurnRequest):
    case_context = _get_case_context(turn_request.case_id)
    rag_docs = rag_service.retrieve(turn_request.message, k=3)
    legal_context = case_context + "\n\nΝομικό πλαίσιο:\n" + "\n\n".join(rag_docs)

    async def event_generator():
        full_content = ""
        try:
            async for chunk in llm_service.invoke_role_stream(
                role=turn_request.role,
                message=turn_request.message,
                history=turn_request.history,
                case_context=legal_context,
            ):
                full_content += chunk
                payload = json.dumps({"delta": chunk})
                yield f"data: {payload}\n\n"

            citations = [doc[:120] + "..." if len(doc) > 120 else doc for doc in rag_docs]
            final_payload = json.dumps({
                "role": turn_request.role,
                "content": full_content,
                "citations": citations,
            })
            yield f"data: {final_payload}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            error_payload = json.dumps({"error": str(e)})
            yield f"data: {error_payload}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/verdict", response_model=VerdictResponse)
@limiter.limit("30/minute")
async def request_verdict(request: Request, verdict_request: VerdictRequest):
    case_context = _get_case_context(verdict_request.case_id)

    history_text = "\n".join(
        f"[{entry.get('role', 'unknown').upper()}]: {entry.get('content', '')}"
        for entry in verdict_request.history
    )

    prompt = VERDICT_PROMPT.replace("{history}", history_text).replace(
        "{case_context}", case_context
    )

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
    llm = primary.with_fallbacks([fallback]).with_structured_output(VerdictResponse)

    messages = [
        SystemMessage(content=prompt),
        HumanMessage(content="Render the final verdict based on the trial transcript above."),
    ]

    result = await llm.ainvoke(messages)
    return result


@router.post("/score", response_model=ScoreResult)
@limiter.limit("30/minute")
async def score_turn(request: Request, score_request: ScoreRequest):
    case_context = _get_case_context(score_request.case_id)
    result = await scoring_service.score_argument(
        role=score_request.role,
        argument=score_request.argument,
        case_context=case_context,
    )
    return result
