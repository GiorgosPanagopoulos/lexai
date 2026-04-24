import { useState } from "react";
import type { Role, TurnResponse } from "../types";

interface Scores {
  defense: number;
  prosecution: number;
}

interface Props {
  message: TurnResponse | null;
  onNext: () => void;
  onUserSubmit: (text: string) => void;
  isUserTurn: boolean;
  isLoading: boolean;
  activeRole: Role | null;
  scores: Scores;
}

const ROLE_COLORS: Record<Role, string> = {
  judge: "#c9a84c",
  defense: "#5090c8",
  prosecution: "#c86060",
  witness: "#60b860",
};

const ROLE_BG: Record<Role, string> = {
  judge: "#3a2a00",
  defense: "#0a2040",
  prosecution: "#7a1010",
  witness: "#0a2a0a",
};

const ROLE_LABELS: Record<Role, string> = {
  judge: "Δικαστής",
  defense: "Συνήγορος Υπεράσπισης",
  prosecution: "Εισαγγελέας",
  witness: "Μάρτυρας",
};

const ROLE_INITIALS: Record<Role, string> = {
  judge: "Δ",
  defense: "Υ",
  prosecution: "Ε",
  witness: "Μ",
};

const ALL_ROLES: Role[] = ["judge", "defense", "prosecution", "witness"];

function PortraitSVG({ role, size = 74 }: { role: Role; size?: number }) {
  const color = ROLE_COLORS[role];
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  const faceColors: Record<Role, string> = {
    judge: "#d4a574",
    defense: "#d4a574",
    prosecution: "#c8956a",
    witness: "#c8a878",
  };
  const hairColors: Record<Role, string> = {
    judge: "#bbb",
    defense: "#1a1a1a",
    prosecution: "#1a1a1a",
    witness: "#3a2a10",
  };
  const clothingColors: Record<Role, string> = {
    judge: "#111",
    defense: "#1a3a6a",
    prosecution: "#2a2a2a",
    witness: "#2a3a2a",
  };

  const fc = faceColors[role];
  const hc = hairColors[role];
  const cc = clothingColors[role];
  const r = s * 0.36;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: "block" }}>
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={cx - 2} fill="#0f0a06" />
      {/* Clothing / body */}
      <ellipse cx={cx} cy={s * 0.88} rx={r * 0.9} ry={r * 0.55} fill={cc} />
      {/* Neck */}
      <rect x={cx - r * 0.13} y={cy + r * 0.55} width={r * 0.26} height={r * 0.35} rx={r * 0.1} fill={fc} />
      {/* Face */}
      <ellipse cx={cx} cy={cy} rx={r * 0.62} ry={r * 0.7} fill={fc} />
      {/* Hair */}
      <path
        d={`M${cx - r * 0.62},${cy - r * 0.1} Q${cx - r * 0.55},${cy - r * 0.85} ${cx},${cy - r * 0.78} Q${cx + r * 0.55},${cy - r * 0.85} ${cx + r * 0.62},${cy - r * 0.1}`}
        fill={hc}
      />
      {/* Eyes */}
      <ellipse cx={cx - r * 0.22} cy={cy - r * 0.05} rx={r * 0.14} ry={r * 0.14} fill="white" />
      <ellipse cx={cx + r * 0.22} cy={cy - r * 0.05} rx={r * 0.14} ry={r * 0.14} fill="white" />
      <ellipse cx={cx - r * 0.22} cy={cy - r * 0.04} rx={r * 0.09} ry={r * 0.09} fill="#1a0a00" />
      <ellipse cx={cx + r * 0.22} cy={cy - r * 0.04} rx={r * 0.09} ry={r * 0.09} fill="#1a0a00" />
      {/* Mouth */}
      {role === "prosecution" ? (
        <path d={`M${cx - r * 0.18},${cy + r * 0.32} Q${cx},${cy + r * 0.38} ${cx + r * 0.18},${cy + r * 0.32}`} fill="none" stroke="#a07050" strokeWidth={r * 0.04} />
      ) : role === "witness" ? (
        <path d={`M${cx - r * 0.15},${cy + r * 0.3} Q${cx},${cy + r * 0.35} ${cx + r * 0.15},${cy + r * 0.3}`} fill="#8a5030" strokeWidth="0" />
      ) : (
        <path d={`M${cx - r * 0.16},${cy + r * 0.3} Q${cx},${cy + r * 0.37} ${cx + r * 0.16},${cy + r * 0.3}`} fill="none" stroke="#a07050" strokeWidth={r * 0.04} />
      )}
      {/* Accent: judge glasses */}
      {role === "judge" && (
        <>
          <ellipse cx={cx - r * 0.22} cy={cy - r * 0.05} rx={r * 0.15} ry={r * 0.1} fill="none" stroke="#888" strokeWidth={r * 0.03} />
          <ellipse cx={cx + r * 0.22} cy={cy - r * 0.05} rx={r * 0.15} ry={r * 0.1} fill="none" stroke="#888" strokeWidth={r * 0.03} />
        </>
      )}
      {/* Accent: witness sweat */}
      {role === "witness" && (
        <ellipse cx={cx + r * 0.5} cy={cy - r * 0.2} rx={r * 0.06} ry={r * 0.09} fill="#88bbdd" opacity="0.7" />
      )}
      {/* Role color ring (drawn as border via stroke on outer circle) */}
      <circle cx={cx} cy={cy} r={cx - 2} fill="none" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

export default function DialogBox({
  message,
  onNext,
  onUserSubmit,
  isUserTurn,
  isLoading,
  activeRole,
  scores,
}: Props) {
  const [userInput, setUserInput] = useState("");

  const role = activeRole ?? "judge";
  const color = ROLE_COLORS[role];
  const bg = ROLE_BG[role];
  const label = ROLE_LABELS[role];

  const displayText = message?.content ?? "";
  const citation = message?.citations?.[0] ?? null;
  const score = message?.score ?? null;

  const handleSend = () => {
    if (!userInput.trim()) return;
    onUserSubmit(userInput.trim());
    setUserInput("");
  };

  return (
    <div style={{
      flex: 1,
      background: "#060401",
      borderTop: "3px solid #c9a84c",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minHeight: 0,
    }}>
      {/* Speaker tab */}
      {activeRole && (
        <div style={{
          position: "absolute",
          top: -30,
          left: 20,
          background: bg,
          border: `1px solid ${color}`,
          borderBottom: "none",
          borderRadius: "6px 6px 0 0",
          padding: "4px 14px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: color,
            display: "inline-block",
            animation: "speakerPulse 1.4s ease-in-out infinite",
          }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color, fontWeight: 700, letterSpacing: "0.05em" }}>
            {label}
          </span>
        </div>
      )}

      {/* Main content row */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, padding: "10px 16px 0" }}>
        {/* Left: portrait + role info */}
        <div style={{ flexShrink: 0, width: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 4 }}>
          <div style={{ borderRadius: "50%", overflow: "hidden" }}>
            <PortraitSVG role={role} size={74} />
          </div>
          <div style={{ fontFamily: "system-ui", fontSize: 9, color, letterSpacing: "0.06em", textAlign: "center", fontWeight: 600 }}>
            {label.toUpperCase().slice(0, 10)}
          </div>
          {score !== null && (
            <div style={{
              background: color + "22", border: `1px solid ${color}55`,
              borderRadius: 10, padding: "2px 8px",
              fontFamily: "'Cinzel', serif", fontSize: 10, color, fontWeight: 700,
            }}>
              ▲ {score.toFixed(1)}
            </div>
          )}
        </div>

        {/* Center: dialog text */}
        <div style={{ flex: 1, padding: "6px 20px 0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
            fontSize: 13.5,
            color: "#f0e8d0",
            lineHeight: 1.8,
            flex: 1,
            overflowY: "auto",
          }}>
            {isLoading && !displayText ? (
              <span style={{ color: "#c9a84c55" }}>...</span>
            ) : (
              <>
                {displayText}
                {isLoading && (
                  <span style={{
                    display: "inline-block",
                    width: 2, height: "1em",
                    background: "#c9a84c",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    animation: "cursorBlink 0.9s step-end infinite",
                  }} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 16px 8px",
        borderTop: "1px solid #c9a84c18",
        flexWrap: "wrap",
      }}>
        {/* Mini portrait circles */}
        <div style={{ display: "flex", gap: 6 }}>
          {ALL_ROLES.map((r) => {
            const isActive = r === activeRole;
            const c = ROLE_COLORS[r];
            return (
              <div key={r} style={{
                width: isActive ? 36 : 30,
                height: isActive ? 36 : 30,
                borderRadius: "50%",
                background: c + "22",
                border: `2px solid ${c}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cinzel', serif",
                fontSize: isActive ? 13 : 10,
                color: c,
                fontWeight: 700,
                boxShadow: isActive ? `0 0 10px ${c}88` : "none",
                transition: "all 0.3s",
              }}>
                {ROLE_INITIALS[r]}
              </div>
            );
          })}
        </div>

        {/* Citation badge */}
        {citation && (
          <div style={{
            background: "#c9a84c18", border: "1px solid #c9a84c55",
            borderRadius: 10, padding: "2px 10px",
            fontFamily: "system-ui", fontSize: 9, color: "#c9a84c",
            maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            ⚖ {citation}
          </div>
        )}

        {/* Score badge for defense/prosecution */}
        {activeRole && (activeRole === "defense" || activeRole === "prosecution") && (
          <div style={{
            background: color + "18", border: `1px solid ${color}55`,
            borderRadius: 10, padding: "2px 10px",
            fontFamily: "'Cinzel', serif", fontSize: 9, color, fontWeight: 700,
          }}>
            {activeRole === "defense" ? "Υπεράσπιση" : "Εισαγγελία"}: {scores[activeRole].toFixed(1)}
          </div>
        )}

        {/* Action area */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {isUserTurn ? (
            <>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Εισαγάγετε το επιχείρημα υπεράσπισης..."
                rows={1}
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 12,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "1px solid #c9a84c55",
                  background: "#0f0a05",
                  color: "#f0e8d0",
                  outline: "none",
                  resize: "none",
                  width: 280,
                  lineHeight: 1.5,
                }}
              />
              <button
                onClick={handleSend}
                disabled={!userInput.trim()}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "1px solid #5090c8",
                  background: userInput.trim() ? "#5090c8" : "transparent",
                  color: userInput.trim() ? "#fff" : "#5090c855",
                  cursor: userInput.trim() ? "pointer" : "default",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
              >
                ΥΠΟΒΟΛΗ ▶
              </button>
            </>
          ) : (
            <button
              onClick={onNext}
              disabled={isLoading}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                fontWeight: 700,
                padding: "6px 18px",
                borderRadius: 6,
                border: "1px solid #c9a84c",
                background: isLoading ? "transparent" : "#c9a84c18",
                color: isLoading ? "#c9a84c44" : "#c9a84c",
                cursor: isLoading ? "default" : "pointer",
                letterSpacing: "0.08em",
                transition: "all 0.2s",
              }}
            >
              ΣΥΝΕΧΕΙΑ ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
