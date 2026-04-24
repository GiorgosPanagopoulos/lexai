import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseScenario } from "../types";
import { getCases } from "../services/api";

const DIFFICULTY_COLORS = {
  easy: "#4ade80",
  medium: "#facc15",
  hard: "#f87171",
};

const DIFFICULTY_LABELS = {
  easy: "Εύκολο",
  medium: "Μέτριο",
  hard: "Δύσκολο",
};

export default function HomePage() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCases()
      .then(setCases)
      .catch(() => setError("Αδυναμία σύνδεσης με τον διακομιστή."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#0b0804",
    }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "2.8rem",
          fontWeight: 700,
          color: "#c9a84c",
          margin: 0,
          letterSpacing: "0.08em",
          textShadow: "0 0 40px #c9a84c44",
        }}>
          ⚖ LEXAI
        </h1>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: "1rem",
          color: "#c9a84c88",
          marginTop: "0.5rem",
          fontStyle: "italic",
          letterSpacing: "0.04em",
        }}>
          AI Courtroom Simulator
        </p>
      </header>

      {loading && (
        <p style={{ fontFamily: "'Source Serif 4', serif", color: "#c9a84c88" }}>
          Φόρτωση υποθέσεων...
        </p>
      )}

      {error && (
        <p style={{ fontFamily: "'Source Serif 4', serif", color: "#f87171" }}>{error}</p>
      )}

      {!loading && !error && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1100px",
          width: "100%",
        }}>
          {cases.map((c) => (
            <CaseCard key={c.id} caseData={c} onClick={() => navigate(`/courtroom/${c.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

function CaseCard({ caseData, onClick }: { caseData: CaseScenario; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#12100a",
        border: `1px solid ${hovered ? "#c9a84c" : "#c9a84c22"}`,
        borderRadius: 12,
        padding: "1.75rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 0 24px #c9a84c44" : "none",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#f0e8d0",
          margin: 0,
          flex: 1,
          paddingRight: "0.5rem",
        }}>
          {caseData.title}
        </h2>
        <span style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          padding: "0.2rem 0.5rem",
          borderRadius: 9999,
          background: DIFFICULTY_COLORS[caseData.difficulty] + "22",
          color: DIFFICULTY_COLORS[caseData.difficulty],
          border: `1px solid ${DIFFICULTY_COLORS[caseData.difficulty]}55`,
          whiteSpace: "nowrap" as const,
        }}>
          {DIFFICULTY_LABELS[caseData.difficulty]}
        </span>
      </div>

      <p style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: "0.88rem",
        color: "#c9a84c88",
        lineHeight: 1.6,
        margin: "0 0 1.25rem",
      }}>
        {caseData.description}
      </p>

      <button style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        padding: "0.5rem 1rem",
        borderRadius: 6,
        border: "1px solid #c9a84c",
        background: hovered ? "#c9a84c" : "transparent",
        color: hovered ? "#0b0804" : "#c9a84c",
        cursor: "pointer",
        transition: "all 0.2s",
        pointerEvents: "none" as const,
      }}>
        Εισαγωγή στο Δικαστήριο →
      </button>
    </div>
  );
}
