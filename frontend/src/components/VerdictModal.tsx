import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VerdictResponse } from "../types";

interface VerdictModalProps {
  verdict: VerdictResponse;
}

export default function VerdictModal({ verdict }: VerdictModalProps) {
  const navigate = useNavigate();
  const [showVerdict, setShowVerdict] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowVerdict(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const isGuilty = verdict.verdict === "GUILTY";
  const verdictText = isGuilty ? "ΕΝΟΧΟΣ" : "ΑΘΩΟΣ";
  const verdictColor = isGuilty ? "#d94a4a" : "#4ade80";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid #c9a84c",
          borderRadius: "12px",
          padding: "2.5rem",
          maxWidth: "560px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 0 60px #c9a84c33",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            animation: "gavelDrop 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards",
            transformOrigin: "top center",
            display: "inline-block",
          }}
        >
          🔨
        </div>

        {showVerdict && (
          <>
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "3rem",
                fontWeight: 700,
                color: verdictColor,
                textShadow: `0 0 30px ${verdictColor}88`,
                margin: "1rem 0 0.5rem",
                animation: "fadeIn 0.5s ease-in",
              }}
            >
              {verdictText}
            </h1>

            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.95rem",
                color: "var(--text-parchment)",
                lineHeight: 1.7,
                margin: "1rem 0 1.5rem",
                animation: "fadeIn 0.5s ease-in 0.2s both",
              }}
            >
              {verdict.reasoning}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "1.5rem",
                animation: "fadeIn 0.5s ease-in 0.4s both",
              }}
            >
              {Object.entries(verdict.scores).map(([role, score]) => (
                <div
                  key={role}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid #c9a84c33",
                    borderRadius: "8px",
                    padding: "0.6rem 1rem",
                    minWidth: "100px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {role === "defense" ? "Υπεράσπιση" : "Εισαγγελία"}
                  </div>
                  <div
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--accent-gold)",
                    }}
                  >
                    {(score as number).toFixed(1)}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.7rem 2rem",
                borderRadius: "6px",
                border: "1px solid #c9a84c",
                background: "#c9a84c",
                color: "#0f1117",
                cursor: "pointer",
                animation: "fadeIn 0.5s ease-in 0.6s both",
              }}
            >
              Νέα Υπόθεση
            </button>
          </>
        )}
      </div>
    </div>
  );
}
