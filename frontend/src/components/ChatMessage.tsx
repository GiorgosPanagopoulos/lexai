import { useState } from "react";
import type { Role } from "../types";

interface ChatMessageProps {
  role: Role | string;
  content: string;
  citations?: string[];
  score?: number | null;
  timestamp: number;
  isStreaming?: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  defense: "Υπεράσπιση",
  prosecution: "Εισαγγελία",
  judge: "Δικαστής",
  witness: "Μάρτυρας",
};

const ROLE_ICONS: Record<string, string> = {
  defense: "⚖",
  prosecution: "⚔",
  judge: "🔨",
  witness: "👤",
};

function scoreColor(score: number): string {
  if (score >= 7.5) return "#4ade80";
  if (score >= 5) return "#facc15";
  return "#f87171";
}

export default function ChatMessage({
  role,
  content,
  citations,
  score,
  isStreaming,
}: ChatMessageProps) {
  const [citationsOpen, setCitationsOpen] = useState(false);

  const borderColor =
    role === "defense"
      ? "#4a90d9"
      : role === "prosecution"
        ? "#d94a4a"
        : role === "judge"
          ? "#c9a84c"
          : "#7a7a8c";

  const roleColor =
    role === "defense"
      ? "#4a90d9"
      : role === "prosecution"
        ? "#d94a4a"
        : role === "judge"
          ? "#c9a84c"
          : "#7a7a8c";

  return (
    <div
      className="chat-message"
      style={{
        borderLeft: `3px solid ${borderColor}`,
        paddingLeft: "1rem",
        marginBottom: "1.25rem",
        animation: "fadeIn 0.3s ease-in",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "1rem" }}>{ROLE_ICONS[role] ?? "💬"}</span>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: "0.8rem",
            color: roleColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {ROLE_LABELS[role] ?? role}
        </span>
        {score != null && (
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "0.15rem 0.5rem",
              borderRadius: "9999px",
              background: scoreColor(score) + "22",
              color: scoreColor(score),
              border: `1px solid ${scoreColor(score)}55`,
            }}
          >
            {score.toFixed(1)}/10
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "var(--text-parchment)",
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
        {isStreaming && (
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: roleColor,
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "blink 0.8s step-end infinite",
            }}
          />
        )}
      </div>

      {citations && citations.length > 0 && (
        <div style={{ marginTop: "0.6rem" }}>
          <button
            onClick={() => setCitationsOpen((o) => !o)}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.72rem",
              color: "#c9a84c",
              background: "transparent",
              border: "1px solid #c9a84c44",
              borderRadius: "4px",
              padding: "0.15rem 0.5rem",
              cursor: "pointer",
            }}
          >
            {citationsOpen ? "▲" : "▼"} Νομικές Αναφορές ({citations.length})
          </button>
          {citationsOpen && (
            <ul
              style={{
                marginTop: "0.4rem",
                paddingLeft: "1rem",
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                listStyle: "disc",
              }}
            >
              {citations.map((c, i) => (
                <li key={i} style={{ marginBottom: "0.25rem" }}>
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
