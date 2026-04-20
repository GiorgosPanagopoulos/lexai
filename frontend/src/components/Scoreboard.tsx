import type { Role } from "../types";

interface ScoreboardProps {
  scores: { defense: number; prosecution: number };
  turnCount: { defense: number; prosecution: number };
  providerMap: Record<Role, string>;
  onRequestVerdict: () => void;
  isStreaming: boolean;
}

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: "#c9a84c",
  OpenAI: "#4a90d9",
  Ollama: "#7a7a8c",
};

export default function Scoreboard({
  scores,
  turnCount,
  providerMap,
  onRequestVerdict,
  isStreaming,
}: ScoreboardProps) {
  const totalTurns = turnCount.defense + turnCount.prosecution;
  const canVerdict = turnCount.defense >= 3 && turnCount.prosecution >= 3;
  const round = Math.floor(totalTurns / 2) + 1;

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
          marginBottom: "0.5rem",
          borderBottom: "1px solid #c9a84c33",
          paddingBottom: "0.5rem",
        }}
      >
        Βαθμολογία
      </h2>

      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginBottom: "1.25rem",
        }}
      >
        Γύρος {round}
      </div>

      <ScoreBar label="Υπεράσπιση" score={scores.defense} color="#4a90d9" provider={providerMap.defense} />
      <ScoreBar label="Εισαγγελία" score={scores.prosecution} color="#d94a4a" provider={providerMap.prosecution} />

      <div style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}>
        <ProviderBadgeRow label="Δικαστής" provider={providerMap.judge} />
        <ProviderBadgeRow label="Μάρτυρας" provider={providerMap.witness} />
      </div>

      <button
        onClick={onRequestVerdict}
        disabled={!canVerdict || isStreaming}
        style={{
          marginTop: "1.5rem",
          width: "100%",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.65rem 1rem",
          borderRadius: "6px",
          border: "1px solid #c9a84c",
          background: canVerdict && !isStreaming ? "#c9a84c" : "transparent",
          color: canVerdict && !isStreaming ? "#0f1117" : "#c9a84c66",
          cursor: canVerdict && !isStreaming ? "pointer" : "not-allowed",
          transition: "all 0.2s",
          animation: canVerdict && !isStreaming ? "pulse 2s ease-in-out infinite" : "none",
        }}
      >
        Αίτημα Ετυμηγορίας
      </button>

      {!canVerdict && (
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
            textAlign: "center",
            marginTop: "0.4rem",
          }}
        >
          Απαιτούνται 3+ γύροι ανά πλευρά
        </p>
      )}
    </div>
  );
}

function ScoreBar({
  label,
  score,
  color,
  provider,
}: {
  label: string;
  score: number;
  color: string;
  provider: string;
}) {
  const pct = Math.min((score / 10) * 100, 100);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.3rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            color,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
          }}
        >
          {score.toFixed(1)}/10
        </span>
      </div>
      <div
        style={{
          height: "6px",
          borderRadius: "3px",
          background: "var(--bg-tertiary)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: "3px",
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <div style={{ marginTop: "0.3rem" }}>
        <ProviderBadge provider={provider} />
      </div>
    </div>
  );
}

function ProviderBadgeRow({ label, provider }: { label: string; provider: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.3rem",
      }}
    >
      <span
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.68rem",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
      <ProviderBadge provider={provider} />
    </div>
  );
}

function ProviderBadge({ provider }: { provider: string }) {
  const color = PROVIDER_COLORS[provider] ?? "#7a7a8c";
  return (
    <span
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: "0.62rem",
        fontWeight: 600,
        padding: "0.1rem 0.4rem",
        borderRadius: "4px",
        border: `1px solid ${color}55`,
        background: `${color}11`,
        color,
      }}
    >
      {provider}
    </span>
  );
}
