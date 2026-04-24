import { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrialStore } from "../store/trialStore";
import { getCaseById, submitTurnStream, requestVerdict, scoreArgument } from "../services/api";
import CourtroomScene from "../components/CourtroomScene";
import DialogBox from "../components/DialogBox";
import VerdictModal from "../components/VerdictModal";
import type { Role, ChatEntry, TurnResponse } from "../types";

export default function CourtroomPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const autoTriggerRef = useRef(false);

  const {
    phase,
    currentCase,
    history,
    scores,
    turnCount,
    currentTurn,
    isStreaming,
    streamingRole,
    streamingContent,
    verdict,
    startTrial,
    addTurn,
    updateScore,
    setStreaming,
    appendStreamContent,
    advanceTurn,
    setVerdict,
  } = useTrialStore();

  useEffect(() => {
    if (!caseId) return;
    getCaseById(caseId)
      .then((c) => startTrial(c))
      .catch(() => navigate("/"));
  }, [caseId, startTrial, navigate]);

  const triggerAITurn = useCallback(
    async (role: Role) => {
      if (!currentCase || isStreaming) return;
      setStreaming(role, "");

      const historyPayload = history.map((e) => ({ role: e.role, content: e.content }));

      let fullContent = "";
      const responseHolder: { value: TurnResponse | null } = { value: null };

      await submitTurnStream(
        {
          case_id: currentCase.id,
          role,
          message: `Continue the trial as ${role}.`,
          history: historyPayload,
        },
        (chunk) => {
          fullContent += chunk;
          appendStreamContent(chunk);
        },
        (full) => {
          responseHolder.value = full;
        }
      );

      setStreaming(null);

      const finalResponse = responseHolder.value;
      const entry: ChatEntry = {
        role,
        content: finalResponse?.content ?? fullContent,
        citations: finalResponse?.citations ?? [],
        score: null,
        timestamp: Date.now(),
      };
      addTurn(entry);
      advanceTurn();

      if (role === "defense" || role === "prosecution") {
        try {
          const result = await scoreArgument(role, entry.content, currentCase.id);
          updateScore(role, result.score);
        } catch {
          // scoring is non-critical
        }
      }
    },
    [currentCase, isStreaming, history, setStreaming, appendStreamContent, addTurn, advanceTurn, updateScore]
  );

  // Auto-trigger AI turns (prosecution, judge) — defense is always user in play mode
  useEffect(() => {
    if (phase !== "trial" || isStreaming || !currentTurn) return;
    if (autoTriggerRef.current) return;
    // In this visual novel UI, defense is user turn; all others are AI
    if (currentTurn !== "defense") {
      autoTriggerRef.current = true;
      const t = setTimeout(() => {
        autoTriggerRef.current = false;
        triggerAITurn(currentTurn);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [currentTurn, phase, isStreaming, triggerAITurn]);

  const handleUserSubmit = async (text: string) => {
    if (!currentCase || isStreaming || currentTurn !== "defense") return;

    const entry: ChatEntry = {
      role: "defense",
      content: text,
      citations: [],
      score: null,
      timestamp: Date.now(),
    };
    addTurn(entry);
    advanceTurn();

    try {
      const result = await scoreArgument("defense", text, currentCase.id);
      updateScore("defense", result.score);
    } catch {
      // non-critical
    }
  };

  const handleRequestVerdict = async () => {
    if (!currentCase) return;
    try {
      const v = await requestVerdict(currentCase.id, history);
      setVerdict(v);
    } catch {
      // verdict error
    }
  };

  // The "last message" shown in the dialog box
  const lastMessage: { role: string; content: string; citations: string[]; score: number | null } | null = (() => {
    if (isStreaming && streamingRole) {
      return {
        role: streamingRole as string,
        content: streamingContent,
        citations: [] as string[],
        score: null,
      };
    }
    if (history.length > 0) {
      const last = history[history.length - 1];
      return { role: last.role, content: last.content, citations: last.citations, score: last.score };
    }
    return null;
  })();

  const activeRole = isStreaming ? streamingRole : (lastMessage?.role as Role | null) ?? currentTurn;
  const isUserTurn = currentTurn === "defense" && !isStreaming;
  const totalTurns = (turnCount.defense ?? 0) + (turnCount.prosecution ?? 0);

  if (!currentCase) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0b0804" }}>
        <p style={{ fontFamily: "'Source Serif 4', serif", color: "#c9a84c88" }}>Φόρτωση...</p>
      </div>
    );
  }

  // Verdict button: enable after 3+ turns each side
  const canRequestVerdict = (turnCount.defense ?? 0) >= 3 && (turnCount.prosecution ?? 0) >= 3;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0b0804", overflow: "hidden" }}>
      <CourtroomScene
        activeRole={activeRole as Role | null}
        scores={scores}
        turnCount={totalTurns}
        caseTitle={currentCase.title}
      />

      <DialogBox
        message={lastMessage}
        onNext={handleRequestVerdict}
        onUserSubmit={handleUserSubmit}
        isUserTurn={isUserTurn}
        isLoading={isStreaming}
        activeRole={activeRole as Role | null}
        scores={scores}
      />

      {/* Verdict request button — shown when eligible and not in verdict phase */}
      {canRequestVerdict && phase === "trial" && !isStreaming && (
        <div style={{
          position: "fixed",
          bottom: 90,
          right: 20,
          zIndex: 50,
        }}>
          <button
            onClick={handleRequestVerdict}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "0.6rem 1.2rem",
              borderRadius: 6,
              border: "1px solid #c9a84c",
              background: "#c9a84c18",
              color: "#c9a84c",
              cursor: "pointer",
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            ⚖ Αίτημα Ετυμηγορίας
          </button>
        </div>
      )}

      {phase === "verdict" && verdict && <VerdictModal verdict={verdict} />}
    </div>
  );
}
