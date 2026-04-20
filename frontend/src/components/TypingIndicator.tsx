import type { Role } from "../types";

interface TypingIndicatorProps {
  role: Role;
}

const ROLE_MESSAGES: Record<Role, string> = {
  defense: "Η Υπεράσπιση ετοιμάζει επιχείρημα...",
  prosecution: "Η Εισαγγελία προετοιμάζει απάντηση...",
  judge: "Ο Δικαστής εξετάζει...",
  witness: "Ο Μάρτυρας σκέφτεται...",
};

const ROLE_LABELS: Record<Role, string> = {
  defense: "Υπεράσπιση",
  prosecution: "Εισαγγελία",
  judge: "Δικαστής",
  witness: "Μάρτυρας",
};

const ROLE_COLOR: Record<Role, string> = {
  defense: "#4a90d9",
  prosecution: "#d94a4a",
  judge: "#c9a84c",
  witness: "#7a7a8c",
};

export default function TypingIndicator({ role }: TypingIndicatorProps) {
  const color = ROLE_COLOR[role];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.75rem 1rem",
        borderLeft: `3px solid ${color}`,
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: color,
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginRight: "0.4rem",
          }}
        >
          {ROLE_LABELS[role]}
        </span>
        <span
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          {ROLE_MESSAGES[role]}
        </span>
      </div>
    </div>
  );
}
