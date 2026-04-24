import type { ReactElement } from "react";
import type { Role } from "../types";

interface Scores {
  defense: number;
  prosecution: number;
}

interface Props {
  activeRole: Role | null;
  scores: Scores;
  turnCount: number;
  caseTitle: string;
}

const ROLE_COLORS: Record<Role, string> = {
  judge: "#c9a84c",
  defense: "#5090c8",
  prosecution: "#c86060",
  witness: "#60b860",
};

const ROLE_LABELS: Record<Role, string> = {
  judge: "ΔΙΚΑΣΤΗΣ",
  defense: "ΥΠΕΡΑΣΤΠΙΣΗ",
  prosecution: "ΕΙΣΑΓΓΕΛΕΑΣ",
  witness: "ΜΑΡΤΥΣ",
};

function JudgeSVG() {
  return (
    <g>
      {/* Robe body */}
      <path d="M435,175 Q432,185 428,220 L472,220 Q468,185 465,175 Z" fill="#111" />
      {/* Gold stole tabs */}
      <rect x="443" y="178" width="5" height="12" rx="1" fill="#c9a84c" />
      <rect x="452" y="178" width="5" height="12" rx="1" fill="#c9a84c" />
      {/* White collar */}
      <path d="M442,177 L458,177 L456,183 L444,183 Z" fill="#eee" />
      {/* Neck */}
      <rect x="447" y="163" width="6" height="14" rx="2" fill="#d4a574" />
      {/* Head */}
      <ellipse cx="450" cy="150" rx="16" ry="18" fill="#d4a574" />
      {/* Silver hair */}
      <path d="M434,144 Q436,132 450,131 Q464,132 466,144 Q463,135 450,134 Q437,135 434,144 Z" fill="#bbb" />
      <path d="M434,144 Q432,152 434,158" stroke="#bbb" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M466,144 Q468,152 466,158" stroke="#bbb" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Reading glasses */}
      <ellipse cx="444" cy="151" rx="5" ry="3" fill="none" stroke="#888" strokeWidth="1" />
      <ellipse cx="456" cy="151" rx="5" ry="3" fill="none" stroke="#888" strokeWidth="1" />
      <line x1="449" y1="151" x2="451" y2="151" stroke="#888" strokeWidth="1" />
      {/* Eyes behind glasses */}
      <ellipse cx="444" cy="151" rx="3" ry="2" fill="#333" />
      <ellipse cx="456" cy="151" rx="3" ry="2" fill="#333" />
      {/* Eyebrows - stern */}
      <path d="M440,146 Q444,144 448,146" stroke="#888" strokeWidth="1.5" fill="none" />
      <path d="M452,146 Q456,144 460,146" stroke="#888" strokeWidth="1.5" fill="none" />
      {/* Nose */}
      <path d="M449,154 L448,159 L452,159 L451,154" fill="none" stroke="#b8905a" strokeWidth="1" />
      {/* Stern frown */}
      <path d="M446,163 Q450,161 454,163" fill="none" stroke="#a07050" strokeWidth="1.5" />
      {/* Gavel hand */}
      <line x1="467" y1="190" x2="478" y2="178" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
      <rect x="474" y="172" width="10" height="5" rx="1" fill="#8B4513" transform="rotate(-40,479,174)" />
    </g>
  );
}

function DefenseSVG() {
  return (
    <g>
      {/* Body - royal blue suit */}
      <path d="M160,310 Q155,280 152,250 L218,250 Q215,280 210,310 Z" fill="#1a3a6a" />
      {/* Jacket lapels */}
      <path d="M185,250 L175,270 L185,265 Z" fill="#22508a" />
      <path d="M185,250 L195,270 L185,265 Z" fill="#22508a" />
      {/* White shirt */}
      <rect x="182" y="252" width="6" height="15" fill="#f0f0f0" />
      {/* Blue tie */}
      <path d="M184,255 L183,275 L185,278 L187,275 L186,255 Z" fill="#3060a0" />
      {/* Neck */}
      <rect x="181" y="235" width="8" height="16" rx="2" fill="#d4a574" />
      {/* Head */}
      <ellipse cx="185" cy="218" rx="20" ry="22" fill="#d4a574" />
      {/* Dark professional hair */}
      <path d="M165,213 Q167,198 185,196 Q203,198 205,213 Q202,202 185,201 Q168,202 165,213 Z" fill="#1a1a1a" />
      {/* Eyes */}
      <ellipse cx="178" cy="217" rx="4" ry="4" fill="white" />
      <ellipse cx="192" cy="217" rx="4" ry="4" fill="white" />
      <ellipse cx="178" cy="218" rx="2.5" ry="2.5" fill="#2a1a0a" />
      <ellipse cx="192" cy="218" rx="2.5" ry="2.5" fill="#2a1a0a" />
      <circle cx="179" cy="217" r="0.8" fill="white" />
      <circle cx="193" cy="217" r="0.8" fill="white" />
      {/* Eyebrows */}
      <path d="M174,212 Q178,210 182,212" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <path d="M188,212 Q192,210 196,212" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      {/* Nose */}
      <path d="M184,221 L183,226 L187,226 L186,221" fill="none" stroke="#b8905a" strokeWidth="1.2" />
      {/* Confident slight smile */}
      <path d="M180,230 Q185,233 190,230" fill="none" stroke="#a07050" strokeWidth="1.5" />
      {/* Briefcase */}
      <rect x="205" y="285" width="22" height="16" rx="2" fill="#5a3010" />
      <rect x="212" y="282" width="8" height="4" rx="1" fill="#7a4a20" />
      <line x1="205" y1="293" x2="227" y2="293" stroke="#7a4a20" strokeWidth="1" />
    </g>
  );
}

function ProsecutionSVG() {
  return (
    <g>
      {/* Body - charcoal suit */}
      <path d="M668,320 Q664,288 660,255 L732,255 Q728,288 724,320 Z" fill="#2a2a2a" />
      {/* Jacket lapels */}
      <path d="M696,255 L684,278 L696,272 Z" fill="#3a3a3a" />
      <path d="M696,255 L708,278 L696,272 Z" fill="#3a3a3a" />
      {/* White shirt */}
      <rect x="693" y="257" width="6" height="16" fill="#f0f0f0" />
      {/* Dark red tie */}
      <path d="M695,260 L694,282 L696,285 L698,282 L697,260 Z" fill="#8a2020" />
      {/* Neck */}
      <rect x="692" y="238" width="8" height="18" rx="2" fill="#c8956a" />
      {/* Head */}
      <ellipse cx="696" cy="220" rx="22" ry="24" fill="#c8956a" />
      {/* Dark hair with gray temples */}
      <path d="M674,215 Q676,198 696,196 Q716,198 718,215 Q714,202 696,201 Q678,202 674,215 Z" fill="#1a1a1a" />
      {/* Gray temples */}
      <path d="M674,215 Q673,222 675,228" stroke="#888" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M718,215 Q719,222 717,228" stroke="#888" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="688" cy="219" rx="4.5" ry="4.5" fill="white" />
      <ellipse cx="704" cy="219" rx="4.5" ry="4.5" fill="white" />
      <ellipse cx="688" cy="220" rx="3" ry="3" fill="#1a0a0a" />
      <ellipse cx="704" cy="220" rx="3" ry="3" fill="#1a0a0a" />
      <circle cx="689" cy="219" r="0.9" fill="white" />
      <circle cx="705" cy="219" r="0.9" fill="white" />
      {/* Intense eyebrows angled down */}
      <path d="M683,213 Q688,210 693,213" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
      <path d="M699,213 Q704,210 709,213" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
      {/* Nose */}
      <path d="M695,224 L694,230 L698,230 L697,224" fill="none" stroke="#a07850" strokeWidth="1.2" />
      {/* Slight smirk */}
      <path d="M690,236 Q696,240 702,236 Q699,238 696,239 Q693,238 690,236" fill="#c08060" />
      {/* Documents in hand */}
      <rect x="716" y="278" width="14" height="18" rx="1" fill="#f0e8d0" transform="rotate(8,723,287)" />
      <rect x="718" y="276" width="14" height="18" rx="1" fill="#e8e0c8" transform="rotate(4,725,285)" />
      <line x1="720" y1="283" x2="730" y2="283" stroke="#aaa" strokeWidth="0.8" transform="rotate(4,725,285)" />
      <line x1="720" y1="287" x2="730" y2="287" stroke="#aaa" strokeWidth="0.8" transform="rotate(4,725,285)" />
    </g>
  );
}

function WitnessSVG() {
  return (
    <g>
      {/* Body - rumpled dark green jacket */}
      <path d="M406,285 Q402,265 400,240 L462,240 Q460,265 456,285 Z" fill="#2a3a2a" />
      {/* Wrinkled lapels */}
      <path d="M431,242 L420,260 L431,256 Z" fill="#354535" />
      <path d="M431,242 L442,260 L431,256 Z" fill="#354535" />
      {/* Shirt visible */}
      <rect x="428" y="243" width="6" height="14" fill="#d8cbb8" />
      {/* Neck */}
      <rect x="428" y="228" width="6" height="14" rx="2" fill="#c8a878" />
      {/* Head */}
      <ellipse cx="431" cy="212" rx="19" ry="22" fill="#c8a878" />
      {/* Messy hair */}
      <path d="M412,206 Q414,192 431,191 Q448,192 450,206 Q447,196 431,195 Q415,196 412,206 Z" fill="#3a2a10" />
      {/* Stray hair strands */}
      <path d="M415,200 Q412,195 414,190" stroke="#3a2a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M448,198 Q452,193 450,188" stroke="#3a2a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M431,192 Q433,186 431,183" stroke="#3a2a10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyes wide open (nervous) */}
      <ellipse cx="424" cy="212" rx="5" ry="6" fill="white" />
      <ellipse cx="438" cy="212" rx="5" ry="6" fill="white" />
      {/* Irises */}
      <ellipse cx="424" cy="213" rx="3.5" ry="3.5" fill="#5a3a1a" />
      <ellipse cx="438" cy="213" rx="3.5" ry="3.5" fill="#5a3a1a" />
      {/* Pupils */}
      <ellipse cx="424" cy="213" rx="2" ry="2" fill="#1a0a00" />
      <ellipse cx="438" cy="213" rx="2" ry="2" fill="#1a0a00" />
      <circle cx="425" cy="212" r="0.8" fill="white" />
      <circle cx="439" cy="212" r="0.8" fill="white" />
      {/* White showing above iris - nervous */}
      <ellipse cx="424" cy="209" rx="4" ry="2" fill="white" />
      <ellipse cx="438" cy="209" rx="4" ry="2" fill="white" />
      {/* Raised eyebrows */}
      <path d="M419,204 Q424,201 429,204" stroke="#3a2a10" strokeWidth="2" fill="none" />
      <path d="M433,204 Q438,201 443,204" stroke="#3a2a10" strokeWidth="2" fill="none" />
      {/* Worry lines on forehead */}
      <path d="M422,207 Q431,205 440,207" stroke="#b09060" strokeWidth="0.6" fill="none" />
      <path d="M424,210 Q431,208 438,210" stroke="#b09060" strokeWidth="0.5" fill="none" />
      {/* Slightly open mouth */}
      <path d="M426,222 Q431,225 436,222" fill="#8a5030" />
      <path d="M427,222 Q431,224 435,222" fill="#c08060" />
      {/* Sweat drop */}
      <ellipse cx="449" cy="205" rx="2" ry="3" fill="#88bbdd" opacity="0.8" />
      <ellipse cx="449" cy="202" rx="1.2" ry="1.5" fill="#aaccee" opacity="0.6" />
      {/* Hands gripping witness stand edge */}
      <path d="M406,270 Q402,275 404,280 L416,278 Q415,273 416,268 Z" fill="#c8a878" />
      <path d="M456,270 Q460,275 458,280 L446,278 Q447,273 446,268 Z" fill="#c8a878" />
    </g>
  );
}

function CourtroomBackground() {
  return (
    <>
      {/* Sky/ceiling */}
      <rect x="0" y="0" width="900" height="80" fill="#1a1008" />
      {/* Ceiling molding */}
      <rect x="0" y="78" width="900" height="6" fill="#2a1e0a" />

      {/* Back wall - dark wood panels */}
      <rect x="0" y="84" width="900" height="220" fill="#1e1208" />
      {/* Vertical wood panel dividers */}
      {[60, 160, 260, 360, 540, 640, 740, 840].map((x) => (
        <rect key={x} x={x} y="84" width="3" height="220" fill="#0a0804" opacity="0.7" />
      ))}
      {/* Gold accent strips */}
      {[60, 160, 260, 360, 540, 640, 740, 840].map((x) => (
        <rect key={x} x={x + 1} y="84" width="1" height="220" fill="#c9a84c" opacity="0.4" />
      ))}
      {/* Horizontal gold rail */}
      <rect x="0" y="145" width="900" height="2" fill="#c9a84c" opacity="0.5" />
      <rect x="0" y="200" width="900" height="2" fill="#c9a84c" opacity="0.3" />

      {/* Left wall */}
      <path d="M0,0 L0,425 L200,425 L130,84 L0,84 Z" fill="#16100a" />
      {/* Right wall */}
      <path d="M900,0 L900,425 L700,425 L770,84 L900,84 Z" fill="#16100a" />

      {/* Floor with perspective tiles */}
      <path d="M0,425 L900,425 L900,304 L0,304 Z" fill="#1a1208" />
      {/* Floor tile lines radiating to vanishing point (x=450, y=250) */}
      {[-200, -100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x, i) => (
        <line key={i} x1={x} y1={425} x2={450} y2={250} stroke="#c9a84c" strokeWidth="0.5" opacity="0.15" />
      ))}
      {/* Horizontal floor lines */}
      {[320, 340, 360, 385, 410].map((y) => (
        <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="#c9a84c" strokeWidth="0.5" opacity="0.12" />
      ))}

      {/* Columns left */}
      <rect x="100" y="84" width="22" height="220" fill="#251810" />
      <rect x="100" y="84" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="100" y="296" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="190" y="84" width="22" height="220" fill="#251810" />
      <rect x="190" y="84" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="190" y="296" width="22" height="8" fill="#c9a84c" opacity="0.5" />

      {/* Columns right */}
      <rect x="688" y="84" width="22" height="220" fill="#251810" />
      <rect x="688" y="84" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="688" y="296" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="778" y="84" width="22" height="220" fill="#251810" />
      <rect x="778" y="84" width="22" height="8" fill="#c9a84c" opacity="0.5" />
      <rect x="778" y="296" width="22" height="8" fill="#c9a84c" opacity="0.5" />

      {/* Arched windows left */}
      <path d="M120,100 Q121,88 135,88 Q149,88 150,100 L150,150 L120,150 Z" fill="#1a2a3a" opacity="0.8" />
      <path d="M120,100 Q121,88 135,88 Q149,88 150,100 L150,150 L120,150 Z" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      {/* Window mullions */}
      <line x1="135" y1="88" x2="135" y2="150" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="120" y1="120" x2="150" y2="120" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />

      <path d="M210,100 Q211,88 225,88 Q239,88 240,100 L240,150 L210,150 Z" fill="#1a2a3a" opacity="0.8" />
      <path d="M210,100 Q211,88 225,88 Q239,88 240,100 L240,150 L210,150 Z" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="225" y1="88" x2="225" y2="150" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="210" y1="120" x2="240" y2="120" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />

      {/* Arched windows right */}
      <path d="M660,100 Q661,88 675,88 Q689,88 690,100 L690,150 L660,150 Z" fill="#1a2a3a" opacity="0.8" />
      <path d="M660,100 Q661,88 675,88 Q689,88 690,100 L690,150 L660,150 Z" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="675" y1="88" x2="675" y2="150" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="660" y1="120" x2="690" y2="120" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />

      <path d="M750,100 Q751,88 765,88 Q779,88 780,100 L780,150 L750,150 Z" fill="#1a2a3a" opacity="0.8" />
      <path d="M750,100 Q751,88 765,88 Q779,88 780,100 L780,150 L780,150 Z" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
      <line x1="765" y1="88" x2="765" y2="150" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
      <line x1="750" y1="120" x2="780" y2="120" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />

      {/* Chandeliers */}
      <line x1="300" y1="0" x2="300" y2="50" stroke="#c9a84c" strokeWidth="2" opacity="0.6" />
      <ellipse cx="300" cy="55" rx="20" ry="8" fill="#c9a84c" opacity="0.3" />
      <ellipse cx="300" cy="55" rx="20" ry="8" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
      <circle cx="300" cy="52" r="4" fill="#ffe8a0" opacity="0.7" />
      {[-15, -8, 0, 8, 15].map((dx) => (
        <ellipse key={dx} cx={300 + dx} cy="60" rx="1.5" ry="4" fill="#ffe8a0" opacity="0.5" />
      ))}

      <line x1="600" y1="0" x2="600" y2="50" stroke="#c9a84c" strokeWidth="2" opacity="0.6" />
      <ellipse cx="600" cy="55" rx="20" ry="8" fill="#c9a84c" opacity="0.3" />
      <ellipse cx="600" cy="55" rx="20" ry="8" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
      <circle cx="600" cy="52" r="4" fill="#ffe8a0" opacity="0.7" />
      {[-15, -8, 0, 8, 15].map((dx) => (
        <ellipse key={dx} cx={600 + dx} cy="60" rx="1.5" ry="4" fill="#ffe8a0" opacity="0.5" />
      ))}

      {/* Flags */}
      <line x1="340" y1="84" x2="340" y2="130" stroke="#888" strokeWidth="2" />
      <path d="M340,84 L380,92 L340,100 Z" fill="#1a3a6a" />
      <line x1="560" y1="84" x2="560" y2="130" stroke="#888" strokeWidth="2" />
      <path d="M560,84 L520,92 L560,100 Z" fill="#6a1a1a" />

      {/* Scales of Justice seal center-back */}
      <circle cx="450" cy="122" r="28" fill="#1e1208" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
      <circle cx="450" cy="122" r="24" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
      {/* Scales icon */}
      <line x1="450" y1="108" x2="450" y2="136" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
      <line x1="436" y1="113" x2="464" y2="113" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
      <path d="M430,113 Q427,120 430,124 Q433,127 436,124 Q439,120 436,113" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.7" />
      <path d="M464,113 Q461,120 464,124 Q467,127 470,124 Q473,120 470,113" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.7" />

      {/* Gallery railing */}
      <rect x="0" y="295" width="900" height="10" fill="#2a1808" />
      <rect x="0" y="295" width="900" height="2" fill="#c9a84c" opacity="0.4" />
      {/* Audience silhouettes */}
      {[30, 80, 130, 180, 230, 580, 630, 680, 730, 780, 830, 880].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="288" rx="12" ry="8" fill="#0f0a06" />
          <rect x={x - 8} y="288" width="16" height="8" rx="2" fill="#0f0a06" />
        </g>
      ))}

      {/* Judge's elevated bench */}
      <rect x="370" y="210" width="160" height="15" rx="2" fill="#2a1808" />
      <rect x="360" y="225" width="180" height="8" rx="1" fill="#1e1208" />
      <rect x="370" y="210" width="160" height="2" fill="#c9a84c" opacity="0.5" />
      {/* Gavel on bench */}
      <rect x="490" y="204" width="14" height="5" rx="1" fill="#5a2a00" />
      <line x1="497" y1="209" x2="492" y2="216" stroke="#7a4a10" strokeWidth="2" />
      {/* Mic */}
      <line x1="415" y1="200" x2="415" y2="215" stroke="#555" strokeWidth="1.5" />
      <ellipse cx="415" cy="198" rx="4" ry="6" fill="#333" />

      {/* Defense table left */}
      <rect x="80" y="320" width="150" height="12" rx="2" fill="#2a1808" />
      <rect x="80" y="320" width="150" height="2" fill="#c9a84c" opacity="0.3" />
      {/* Papers on defense table */}
      <rect x="90" y="313" width="30" height="8" rx="1" fill="#f0e8d0" opacity="0.6" transform="rotate(-3,105,317)" />
      <rect x="125" y="314" width="25" height="7" rx="1" fill="#e8e0c8" opacity="0.5" transform="rotate(2,137,317)" />

      {/* Prosecution table right */}
      <rect x="670" y="320" width="150" height="12" rx="2" fill="#2a1808" />
      <rect x="670" y="320" width="150" height="2" fill="#c9a84c" opacity="0.3" />
      {/* Document stack */}
      <rect x="750" y="312" width="35" height="9" rx="1" fill="#f0e8d0" opacity="0.6" />
      <rect x="752" y="310" width="33" height="9" rx="1" fill="#e0d8c0" opacity="0.5" />
      <rect x="754" y="308" width="31" height="9" rx="1" fill="#d8d0b8" opacity="0.4" />

      {/* Witness stand center */}
      <rect x="385" y="268" width="92" height="60" rx="3" fill="#251808" />
      <rect x="385" y="268" width="92" height="3" fill="#c9a84c" opacity="0.4" />
      <rect x="388" y="271" width="86" height="54" rx="2" fill="#1e1208" />
    </>
  );
}

export default function CourtroomScene({ activeRole, scores, turnCount, caseTitle }: Props) {
  const renderCharacter = (role: Role, CharComponent: () => ReactElement, x: number, labelY: number) => {
    const isActive = activeRole === role;
    const color = ROLE_COLORS[role];

    if (!activeRole) {
      return (
        <g key={role}>
          <CharComponent />
          <rect x={x - 35} y={labelY} width={70} height={14} rx={3} fill={color} opacity={0.8} />
          <text x={x} y={labelY + 10} textAnchor="middle" fontSize="7" fontFamily="Cinzel, serif" fill="#fff" fontWeight="bold">
            {ROLE_LABELS[role]}
          </text>
        </g>
      );
    }

    if (isActive) {
      return null; // rendered after overlay
    }

    return (
      <g key={role} opacity={0.25}>
        <CharComponent />
      </g>
    );
  };

  const renderActiveCharacter = (role: Role, CharComponent: () => ReactElement, x: number, labelY: number) => {
    const isActive = activeRole === role;
    if (!isActive || !activeRole) return null;
    const color = ROLE_COLORS[role];
    const eyY = labelY - 30;

    return (
      <g key={`active-${role}`}>
        {/* Spotlight glow ellipses */}
        <ellipse cx={x} cy={eyY} rx={60} ry={30} fill={color} opacity={0.05} />
        <ellipse cx={x} cy={eyY} rx={42} ry={22} fill={color} opacity={0.06} />
        <ellipse cx={x} cy={eyY} rx={28} ry={15} fill={color} opacity={0.07} />
        <CharComponent />
        {/* Name tag */}
        <rect x={x - 38} y={labelY} width={76} height={16} rx={3} fill={color} />
        <text x={x} y={labelY + 11} textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="#fff" fontWeight="bold">
          {ROLE_LABELS[role]}
        </text>
      </g>
    );
  };

  const turnDots: Role[] = ["judge", "prosecution", "defense", "witness"];

  return (
    <div style={{ position: "relative", width: "100%", height: "65vh", overflow: "hidden", background: "#0b0804" }}>
      <svg
        viewBox="0 0 900 425"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <CourtroomBackground />

        {/* Dimmed characters (non-active when someone is active) */}
        {renderCharacter("judge", JudgeSVG, 450, 228)}
        {renderCharacter("defense", DefenseSVG, 185, 372)}
        {renderCharacter("prosecution", ProsecutionSVG, 696, 382)}
        {renderCharacter("witness", WitnessSVG, 431, 342)}

        {/* Dark overlay when someone is active */}
        {activeRole && (
          <rect x="0" y="0" width="900" height="425" fill="rgba(2,1,0,0.52)" />
        )}

        {/* Active character on top */}
        {renderActiveCharacter("judge", JudgeSVG, 450, 228)}
        {renderActiveCharacter("defense", DefenseSVG, 185, 372)}
        {renderActiveCharacter("prosecution", ProsecutionSVG, 696, 382)}
        {renderActiveCharacter("witness", WitnessSVG, 431, 342)}
      </svg>

      {/* HUD overlays */}
      {/* Top-left: case badge */}
      <div style={{
        position: "absolute", top: 12, left: 16,
        background: "rgba(6,4,1,0.82)", border: "1px solid #c9a84c",
        borderRadius: 6, padding: "5px 12px",
      }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: "#c9a84c", fontWeight: 700, letterSpacing: "0.06em" }}>
          {caseTitle}
        </div>
        <div style={{ fontFamily: "system-ui", fontSize: 9, color: "#c9a84c88", marginTop: 2 }}>
          Γύρος {Math.min(turnCount, 6)}/6
        </div>
      </div>

      {/* Top-center: trial pill */}
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        background: "rgba(6,4,1,0.82)", border: "1px solid #c9a84c55",
        borderRadius: 12, padding: "4px 14px",
        fontFamily: "'Cinzel', serif", fontSize: 9, color: "#c9a84c",
        letterSpacing: "0.12em", fontWeight: 700,
      }}>
        TRIAL IN PROGRESS
      </div>

      {/* Top-right: score card */}
      <div style={{
        position: "absolute", top: 12, right: 16,
        background: "rgba(6,4,1,0.82)", border: "1px solid #c9a84c44",
        borderRadius: 6, padding: "6px 12px", minWidth: 110,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontFamily: "system-ui", fontSize: 9, color: "#5090c8", fontWeight: 700 }}>Υπεράσπιση</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "#5090c8", fontWeight: 700 }}>{scores.defense.toFixed(1)}</span>
        </div>
        <div style={{ height: 3, background: "#111", borderRadius: 2, marginBottom: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(scores.defense * 10, 100)}%`, background: "#5090c8", transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontFamily: "system-ui", fontSize: 9, color: "#c86060", fontWeight: 700 }}>Εισαγγελία</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "#c86060", fontWeight: 700 }}>{scores.prosecution.toFixed(1)}</span>
        </div>
        <div style={{ height: 3, background: "#111", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(scores.prosecution * 10, 100)}%`, background: "#c86060", transition: "width 0.5s" }} />
        </div>
      </div>

      {/* Bottom-center: turn dots */}
      <div style={{
        position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
        background: "rgba(6,4,1,0.85)", border: "1px solid #c9a84c33",
        borderRadius: 20, padding: "6px 16px",
        display: "flex", gap: 16, alignItems: "center",
        pointerEvents: "none",
      }}>
        {turnDots.map((role) => {
          const isActive = activeRole === role;
          const color = ROLE_COLORS[role];
          return (
            <div key={role} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: color,
                opacity: isActive ? 1 : 0.28,
                boxShadow: isActive ? `0 0 8px ${color}` : "none",
                transition: "all 0.3s",
              }} />
              <span style={{
                fontFamily: "system-ui", fontSize: 7, color: color,
                opacity: isActive ? 1 : 0.4,
                letterSpacing: "0.04em",
              }}>
                {ROLE_LABELS[role].slice(0, 4)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
