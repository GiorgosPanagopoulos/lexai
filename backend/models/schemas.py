from typing import Literal
from pydantic import BaseModel


class CaseScenario(BaseModel):
    id: str
    title: str
    description: str
    facts: list[str]
    evidence: list[str]
    difficulty: Literal["easy", "medium", "hard"]


class TurnRequest(BaseModel):
    case_id: str
    role: Literal["defense", "prosecution", "judge", "witness"]
    message: str
    history: list[dict]


class TurnResponse(BaseModel):
    role: str
    content: str
    citations: list[str] = []
    score: float | None = None


class ScoreResult(BaseModel):
    score: float
    reasoning: str
    strengths: list[str]
    weaknesses: list[str]


class VerdictResponse(BaseModel):
    verdict: Literal["GUILTY", "NOT_GUILTY"]
    reasoning: str
    scores: dict[str, float]


class VerdictRequest(BaseModel):
    case_id: str
    history: list[dict]


class ScoreRequest(BaseModel):
    role: str
    argument: str
    case_id: str
