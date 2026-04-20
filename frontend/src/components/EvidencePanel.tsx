import type { CaseScenario, ChatEntry } from "../types";

interface EvidencePanelProps {
  caseData: CaseScenario;
  history: ChatEntry[];
}

function isHighlighted(evidence: string, history: ChatEntry[]): boolean {
  const lower = evidence.toLowerCase();
  return history.some((entry) =>
    entry.citations?.some((c) => c.toLowerCase().includes(lower.slice(0, 30)))
  );
}

export default function EvidencePanel({ caseData, history }: EvidencePanelProps) {
  return (
    <div style={{ padding: "1rem" }}>
      <h2
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "var(--accent-gold)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          borderBottom: "1px solid #c9a84c33",
          paddingBottom: "0.5rem",
        }}
      >
        Στοιχεία Υπόθεσης
      </h2>

      <section style={{ marginBottom: "1.25rem" }}>
        <h3
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.6rem",
          }}
        >
          Γεγονότα
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {caseData.facts.map((fact, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.8rem",
                color: "var(--text-parchment)",
                lineHeight: 1.6,
                marginBottom: "0.5rem",
                paddingLeft: "0.75rem",
                borderLeft: "2px solid #c9a84c44",
              }}
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.6rem",
          }}
        >
          Αποδεικτικά
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {caseData.evidence.map((ev, i) => {
            const highlighted = isHighlighted(ev, history);
            return (
              <li
                key={i}
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "0.8rem",
                  color: highlighted ? "var(--accent-gold)" : "var(--text-parchment)",
                  lineHeight: 1.6,
                  marginBottom: "0.5rem",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "4px",
                  border: highlighted ? "1px solid #c9a84c88" : "1px solid transparent",
                  background: highlighted ? "#c9a84c11" : "transparent",
                  boxShadow: highlighted ? "0 0 8px #c9a84c33" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {ev}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
