import type {
  CaseScenario,
  TurnRequest,
  TurnResponse,
  VerdictResponse,
  ScoreResult,
  Role,
  ChatEntry,
} from "../types";

const API_BASE = "http://localhost:8000/api";

export async function getCases(): Promise<CaseScenario[]> {
  const res = await fetch(`${API_BASE}/cases`);
  if (!res.ok) throw new Error("Failed to fetch cases");
  return res.json();
}

export async function getCaseById(id: string): Promise<CaseScenario> {
  const res = await fetch(`${API_BASE}/cases/${id}`);
  if (!res.ok) throw new Error("Failed to fetch case");
  return res.json();
}

export async function submitTurnStream(
  req: TurnRequest,
  onChunk: (text: string) => void,
  onDone: (full: TurnResponse) => void
): Promise<void> {
  const res = await fetch(`${API_BASE}/trial/turn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok || !res.body) throw new Error("Stream request failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalResponse: TurnResponse | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") {
        if (finalResponse) onDone(finalResponse);
        return;
      }
      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        if ("delta" in parsed && typeof parsed.delta === "string") {
          onChunk(parsed.delta);
        } else if ("role" in parsed && "content" in parsed) {
          finalResponse = parsed as unknown as TurnResponse;
        }
      } catch {
        // skip malformed lines
      }
    }
  }
}

export async function requestVerdict(
  caseId: string,
  history: ChatEntry[]
): Promise<VerdictResponse> {
  const res = await fetch(`${API_BASE}/trial/verdict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      case_id: caseId,
      history: history.map((e) => ({ role: e.role, content: e.content })),
    }),
  });
  if (!res.ok) throw new Error("Verdict request failed");
  return res.json();
}

export async function scoreArgument(
  role: Role,
  argument: string,
  caseId: string
): Promise<ScoreResult> {
  const res = await fetch(`${API_BASE}/trial/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, argument, case_id: caseId }),
  });
  if (!res.ok) throw new Error("Score request failed");
  return res.json();
}
