import { create } from "zustand";
import type { Phase, Role, CaseScenario, ChatEntry, VerdictResponse } from "../types";

interface TrialState {
  phase: Phase;
  currentCase: CaseScenario | null;
  history: ChatEntry[];
  scores: { defense: number; prosecution: number };
  turnCount: { defense: number; prosecution: number };
  currentTurn: Role | null;
  isStreaming: boolean;
  streamingRole: Role | null;
  streamingContent: string;
  verdict: VerdictResponse | null;
  providerMap: Record<Role, string>;

  startTrial: (caseScenario: CaseScenario) => void;
  addTurn: (entry: ChatEntry) => void;
  updateScore: (role: Role, score: number) => void;
  setStreaming: (role: Role | null, content?: string) => void;
  appendStreamContent: (text: string) => void;
  advanceTurn: () => void;
  setVerdict: (verdict: VerdictResponse) => void;
  reset: () => void;
}

const TURN_ORDER: Role[] = ["defense", "prosecution", "judge"];

const initialState = {
  phase: "selection" as Phase,
  currentCase: null,
  history: [],
  scores: { defense: 0, prosecution: 0 },
  turnCount: { defense: 0, prosecution: 0 },
  currentTurn: null as Role | null,
  isStreaming: false,
  streamingRole: null as Role | null,
  streamingContent: "",
  verdict: null,
  providerMap: {
    defense: "Anthropic",
    prosecution: "OpenAI",
    judge: "Ollama",
    witness: "Anthropic",
  } as Record<Role, string>,
};

export const useTrialStore = create<TrialState>((set, get) => ({
  ...initialState,

  startTrial: (caseScenario) => {
    set({
      phase: "trial",
      currentCase: caseScenario,
      history: [],
      scores: { defense: 0, prosecution: 0 },
      turnCount: { defense: 0, prosecution: 0 },
      currentTurn: "defense",
      isStreaming: false,
      streamingRole: null,
      streamingContent: "",
      verdict: null,
    });
  },

  addTurn: (entry) => {
    set((state) => {
      const role = entry.role as Role;
      const newTurnCount = { ...state.turnCount };
      if (role === "defense" || role === "prosecution") {
        newTurnCount[role] = (newTurnCount[role] ?? 0) + 1;
      }
      return {
        history: [...state.history, entry],
        turnCount: newTurnCount,
      };
    });
  },

  updateScore: (role, score) => {
    if (role === "defense" || role === "prosecution") {
      set((state) => ({
        scores: {
          ...state.scores,
          [role]: score,
        },
      }));
    }
  },

  setStreaming: (role, content = "") => {
    set({
      isStreaming: role !== null,
      streamingRole: role,
      streamingContent: content,
    });
  },

  appendStreamContent: (text) => {
    set((state) => ({
      streamingContent: state.streamingContent + text,
    }));
  },

  advanceTurn: () => {
    set((state) => {
      const current = state.currentTurn;
      if (!current) return { currentTurn: "defense" as Role };
      const idx = TURN_ORDER.indexOf(current);
      const next = TURN_ORDER[(idx + 1) % TURN_ORDER.length];
      return { currentTurn: next };
    });
  },

  setVerdict: (verdict) => {
    set({ verdict, phase: "verdict" });
  },

  reset: () => {
    set(initialState);
  },
}));
