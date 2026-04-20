export type Role = "defense" | "prosecution" | "judge" | "witness";
export type Phase = "selection" | "trial" | "verdict";

export interface CaseScenario {
  id: string;
  title: string;
  description: string;
  facts: string[];
  evidence: string[];
  difficulty: "easy" | "medium" | "hard";
}

export interface TurnRequest {
  case_id: string;
  role: Role;
  message: string;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  role: string;
  content: string;
}

export interface TurnResponse {
  role: string;
  content: string;
  citations: string[];
  score: number | null;
}

export interface ScoreResult {
  score: number;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
}

export interface VerdictResponse {
  verdict: "GUILTY" | "NOT_GUILTY";
  reasoning: string;
  scores: Record<string, number>;
}

export type ChatEntry = TurnResponse & { timestamp: number };
