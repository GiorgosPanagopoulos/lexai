import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrialStore } from "../store/trialStore";
import type { VerdictResponse } from "../types";

interface VerdictModalProps {
  verdict: VerdictResponse;
}

export default function VerdictModal({ verdict }: VerdictModalProps) {
  const navigate = useNavigate();
  const reset = useTrialStore((s) => s.reset);
  const [showVerdict, setShowVerdict] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowVerdict(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const isGuilty = verdict.verdict === "GUILTY";
  const verdictText = isGuilty ? "ΕΝΟΧΟΣ" : "ΑΘΩΟΣ";
  const verdictColor = isGuilty ? "#c86060" : "#c9a84c";

  const handleNew = () => {
    reset();
    navigate("/");
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.88)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#0b0804",
        border: `2px solid ${verdictColor}`,
        borderRadius: 12,
        padding: "2.5rem 3rem",
        maxWidth: 560,
        width: "90%",
        textAlign: "center",
        boxShadow: `0 0 80px ${verdictColor}44`,
      }}>
        {/* SVG gavel animation */}
        <svg
          width="80" height="80"
          viewBox="0 0 80 80"
          style={{ animation: "gavelDrop 0.8s cubic-bezier(0.36,0.07,0.19,0.97) forwards", display: "inline-block" }}
        >
          {/* Gavel head */}
          <rect x="38" y="8" width="28" height="14" rx="3" fill="#5a2a00" transform="rotate(35,52,15)" />
          <rect x="40" y="8" width="28" height="8" rx="2" fill="#7a4a10" transform="rotate(35,54,12)" />
          {/* Handle */}
          <line x1="42" y1="28" x2="18" y2="62" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" />
          <line x1="42" y1="28" x2="18" y2="62" stroke="#a0561a" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          {/* Strike lines */}
          <line x1="55" y1="38" x2="68" y2="30" stroke={verdictColor} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <line x1="58" y1="44" x2="72" y2="40" stroke={verdictColor} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        </svg>

        {showVerdict && (
          <>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "3.2rem",
              fontWeight: 700,
              color: verdictColor,
              textShadow: `0 0 40px ${verdictColor}88`,
              margin: "1rem 0 0.5rem",
              animation: "fadeIn 0.5s ease-in",
              letterSpacing: "0.06em",
            }}>
              {verdictText}
            </h1>

            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "#f0e8d0",
              lineHeight: 1.7,
              margin: "1rem 0 1.5rem",
              animation: "fadeIn 0.5s ease-in 0.2s both",
            }}>
              {verdict.reasoning}
            </p>

            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginBottom: "1.75rem",
              animation: "fadeIn 0.5s ease-in 0.4s both",
            }}>
              {Object.entries(verdict.scores).map(([role, score]) => {
                const isDefense = role === "defense";
                const roleColor = isDefense ? "#5090c8" : "#c86060";
                return (
                  <div key={role} style={{
                    background: roleColor + "18",
                    border: `1px solid ${roleColor}55`,
                    borderRadius: 8,
                    padding: "0.75rem 1.25rem",
                    minWidth: 110,
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.65rem",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.08em",
                      color: roleColor,
                      marginBottom: "0.35rem",
                    }}>
                      {isDefense ? "Υπεράσπιση" : "Εισαγγελία"}
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: roleColor,
                    }}>
                      {(score as number).toFixed(1)}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNew}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                padding: "0.75rem 2.5rem",
                borderRadius: 6,
                border: "1px solid #c9a84c",
                background: "#c9a84c",
                color: "#0b0804",
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
