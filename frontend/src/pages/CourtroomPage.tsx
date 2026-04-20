import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrialStore } from "../store/trialStore";
import { getCaseById, submitTurnStream, requestVerdict, scoreArgument } from "../services/api";
import ChatMessage from "../components/ChatMessage";
import TypingIndicator from "../components/TypingIndicator";
import Scoreboard from "../components/Scoreboard";
import EvidencePanel from "../components/EvidencePanel";
import VerdictModal from "../components/VerdictModal";
import type { Role, ChatEntry, TurnResponse } from "../types";

type Mode = "play" | "observe";

export default function CourtroomPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("play");
  const [userInput, setUserInput] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
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
    providerMap,
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
      .catch(() => setLoadError("Αδυναμία φόρτωσης υπόθεσης."));
  }, [caseId, startTrial]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, streamingContent]);

  const triggerAITurn = useCallback(
    async (role: Role) => {
      if (!currentCase || isStreaming) return;
      setStreaming(role, "");

      const historyPayload = history.map((e) => ({ role: e.role, content: e.content }));

      let fullContent = "";
      let finalResponse: TurnResponse | null = null;

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
          finalResponse = full;
        }
      );

      setStreaming(null);

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

  // Auto-trigger for AI vs AI and for prosecution/judge in play mode
  useEffect(() => {
    if (phase !== "trial" || isStreaming || !currentTurn) return;
    if (autoTriggerRef.current) return;

    if (mode === "observe") {
      autoTriggerRef.current = true;
      const t = setTimeout(() => {
        autoTriggerRef.current = false;
        triggerAITurn(currentTurn);
      }, 800);
      return () => clearTimeout(t);
    }

    if (mode === "play" && currentTurn !== "defense") {
      autoTriggerRef.current = true;
      const t = setTimeout(() => {
        autoTriggerRef.current = false;
        triggerAITurn(currentTurn);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [currentTurn, phase, isStreaming, mode, triggerAITurn]);

  const handleUserSubmit = async () => {
    if (!userInput.trim() || !currentCase || isStreaming || currentTurn !== "defense") return;

    const msg = userInput.trim();
    setUserInput("");

    const entry: ChatEntry = {
      role: "defense",
      content: msg,
      citations: [],
      score: null,
      timestamp: Date.now(),
    };
    addTurn(entry);
    advanceTurn();

    try {
      const result = await scoreArgument("defense", msg, currentCase.id);
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
      // verdict error — could surface a toast here
    }
  };

  if (loadError) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#f87171", fontFamily: "'Source Serif 4', serif" }}>{loadError}</p>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: "1rem", color: "var(--accent-gold)", background: "none", border: "1px solid var(--accent-gold)", padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "6px" }}
          >
            Επιστροφή
          </button>
        </div>
      </div>
    );
  }

  if (!currentCase) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "'Source Serif 4', serif" }}>Φόρτωση...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-primary)", overflow: "hidden" }}>
      {/* Left sidebar */}
      <aside
        style={{
          width: "280px",
          flexShrink: 0,
          background: "var(--bg-secondary)",
          borderRight: "1px solid #c9a84c22",
          overflowY: "auto",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 39px, #c9a84c08 39px, #c9a84c08 40px), repeating-linear-gradient(0deg, transparent, transparent 39px, #c9a84c08 39px, #c9a84c08 40px)",
        }}
      >
        <EvidencePanel caseData={currentCase} history={history} />
      </aside>

      {/* Center chat */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Mode toggle + header */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            borderBottom: "1px solid #c9a84c22",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            background: "var(--bg-secondary)",
          }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", color: "var(--accent-gold)" }}>
            {currentCase.title}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {(["play", "observe"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.72rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "4px",
                  border: "1px solid #c9a84c44",
                  background: mode === m ? "#c9a84c22" : "transparent",
                  color: mode === m ? "var(--accent-gold)" : "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                {m === "play" ? "Υπεράσπιση (Παίξε)" : "Παρατήρηση AI vs AI"}
              </button>
            ))}
          </div>
        </div>

        {/* Chat log */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {history.length === 0 && !isStreaming && (
            <p style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", marginTop: "3rem" }}>
              Η δίκη αρχίζει...
            </p>
          )}
          {history.map((entry, i) => (
            <ChatMessage
              key={i}
              role={entry.role as Role}
              content={entry.content}
              citations={entry.citations}
              score={entry.score}
              timestamp={entry.timestamp}
            />
          ))}
          {isStreaming && streamingRole && (
            <>
              {streamingContent ? (
                <ChatMessage
                  role={streamingRole}
                  content={streamingContent}
                  citations={[]}
                  score={null}
                  timestamp={Date.now()}
                  isStreaming
                />
              ) : (
                <TypingIndicator role={streamingRole} />
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        {mode === "play" && (
          <div
            style={{
              padding: "0.75rem 1.5rem",
              borderTop: "1px solid #c9a84c22",
              display: "flex",
              gap: "0.75rem",
              background: "var(--bg-secondary)",
            }}
          >
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleUserSubmit(); } }}
              disabled={currentTurn !== "defense" || isStreaming}
              placeholder={
                currentTurn !== "defense" || isStreaming
                  ? "Αναμονή..."
                  : "Εισαγάγετε το επιχείρημα υπεράσπισης..."
              }
              style={{
                flex: 1,
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.9rem",
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                border: "1px solid #c9a84c44",
                background: "var(--bg-tertiary)",
                color: "var(--text-parchment)",
                outline: "none",
                opacity: currentTurn !== "defense" || isStreaming ? 0.5 : 1,
              }}
            />
            <button
              onClick={handleUserSubmit}
              disabled={currentTurn !== "defense" || isStreaming || !userInput.trim()}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                border: "1px solid #c9a84c",
                background: "#c9a84c",
                color: "#0f1117",
                cursor: "pointer",
                opacity: currentTurn !== "defense" || isStreaming || !userInput.trim() ? 0.4 : 1,
              }}
            >
              Υποβολή
            </button>
          </div>
        )}
      </main>

      {/* Right sidebar */}
      <aside
        style={{
          width: "250px",
          flexShrink: 0,
          background: "var(--bg-secondary)",
          borderLeft: "1px solid #c9a84c22",
          overflowY: "auto",
        }}
      >
        <Scoreboard
          scores={scores}
          turnCount={turnCount}
          providerMap={providerMap}
          onRequestVerdict={handleRequestVerdict}
          isStreaming={isStreaming}
        />
      </aside>

      {/* Verdict modal */}
      {phase === "verdict" && verdict && <VerdictModal verdict={verdict} />}
    </div>
  );
}
