"use client";

import { useEffect, useState } from "react";

/* ─── Data ─── */
const silos = [
  {
    label: "Marketing",
    color: "#6C5CE7",
    tools: [
      { name: "HubSpot", color: "#FF7A59", logo: HubSpotLogo },
      { name: "Lemlist", color: "#6C5CE7", logo: LemlistLogo },
    ],
  },
  {
    label: "Sales",
    color: "#FF7A59",
    tools: [
      { name: "Salesforce", color: "#00A1E0", logo: SalesforceLogo },
      { name: "Clay", color: "#2D2D2D", logo: ClayLogo },
    ],
  },
  {
    label: "CS",
    color: "#22C55E",
    tools: [
      { name: "Slack", color: "#4A154B", logo: SlackLogo },
      { name: "Stripe", color: "#635BFF", logo: StripeLogo },
    ],
  },
];

/* ─── Iso constants ─── */
const W = 30, H = 17, D = 24;

export default function CubesIllustration() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);

  const vw = 480, vh = 480;
  const cx = 240, cy = 200;
  const allTools = silos.flatMap((s) => s.tools);
  const grid = [
    { col: 0, row: 0 }, { col: 1, row: 0 },
    { col: 0, row: 1 }, { col: 1, row: 1 },
    { col: 0, row: 2 }, { col: 1, row: 2 },
  ];
  const gapX = W * 2 + 2;
  const gapY = H + D + 3;

  return (
    <div className="relative w-full max-w-[520px]" aria-hidden="true">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full h-auto">
        {/* Dot grid */}
        <defs>
          <pattern id="dg" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.4" fill="#D4D4D4" />
          </pattern>
        </defs>
        <rect width={vw} height={vh} fill="url(#dg)" opacity="0.4" />

        {/* ═══ OUTER ORBIT: Claude / IA ═══ */}
        <g style={{ animation: m ? "fadeIn 0.6s 0.1s both ease-out" : undefined, opacity: m ? undefined : 0 }}>
          {/* Orbit ellipse */}
          <ellipse cx={cx} cy={cy + 25} rx="210" ry="180" fill="none" stroke="#D4A27F" strokeWidth="1.2" strokeOpacity="0.12" strokeDasharray="8 5" />

          {/* Rotating sparkles on orbit */}
          <g style={{ transformOrigin: `${cx}px ${cy + 25}px`, animation: m ? "orbitSpin 30s linear infinite" : undefined }}>
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const ox = cx + Math.cos(rad) * 210;
              const oy = cy + 25 + Math.sin(rad) * 180;
              return (
                <g key={`sp${i}`}>
                  <circle cx={ox} cy={oy} r="3" fill="#D4A27F" fillOpacity="0.2">
                    <animate attributeName="fillOpacity" values="0.1;0.4;0.1" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={ox} cy={oy} r="1.2" fill="#D4A27F" fillOpacity="0.5" />
                </g>
              );
            })}
          </g>

          {/* Claude badge — top right */}
          <g transform={`translate(${cx + 175}, ${cy - 130})`} style={{ animation: m ? "fadeIn 0.5s 0.3s both ease-out" : undefined, opacity: m ? undefined : 0 }}>
            <rect x="-38" y="-15" width="76" height="30" rx="15" fill="white" stroke="#D4A27F" strokeWidth="1" strokeOpacity="0.3" />
            <ClaudeLogo x={-30} y={-8} size={16} />
            <text x="4" y="5" fontSize="10" fontWeight="700" fill="#D4A27F" fontFamily="Inter, system-ui, sans-serif">Claude</text>
          </g>

          {/* Label */}
          <text x={cx} y={cy + 225} textAnchor="middle" fontSize="8" fontWeight="600" fill="#D4A27F" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.12em" opacity="0.4">INTELLIGENCE ARTIFICIELLE</text>
        </g>

        {/* ═══ MIDDLE ORBIT: MCP ═══ */}
        <g style={{ animation: m ? "fadeIn 0.6s 0.25s both ease-out" : undefined, opacity: m ? undefined : 0 }}>
          <ellipse cx={cx} cy={cy + 25} rx="148" ry="128" fill="none" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="5 4" />

          {/* Rotating connection nodes */}
          <g style={{ transformOrigin: `${cx}px ${cy + 25}px`, animation: m ? "orbitSpin 25s linear infinite reverse" : undefined }}>
            {[0, 120, 240].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const nx = cx + Math.cos(rad) * 148;
              const ny = cy + 25 + Math.sin(rad) * 128;
              return (
                <g key={`nd${i}`}>
                  <circle cx={nx} cy={ny} r="5" fill="white" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.15" />
                  <circle cx={nx} cy={ny} r="2" fill="#0A0A0A" fillOpacity="0.15">
                    <animate attributeName="fillOpacity" values="0.08;0.3;0.08" dur="2.5s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* MCP badge — top left */}
          <g transform={`translate(${cx - 135}, ${cy - 90})`} style={{ animation: m ? "fadeIn 0.5s 0.4s both ease-out" : undefined, opacity: m ? undefined : 0 }}>
            <rect x="-30" y="-14" width="60" height="28" rx="14" fill="white" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.1" />
            <circle cx="-16" cy="0" r="6" fill="#0A0A0A" fillOpacity="0.08" />
            <circle cx="-16" cy="0" r="2.5" fill="#0A0A0A" fillOpacity="0.2" />
            <text x="2" y="4" fontSize="9" fontWeight="700" fill="#525252" fontFamily="Inter, system-ui, sans-serif">MCP</text>
          </g>

          <text x={cx} y={cy + 170} textAnchor="middle" fontSize="8" fontWeight="600" fill="#737373" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.12em" opacity="0.3">PROTOCOLE MCP</text>
        </g>

        {/* ═══ CENTER: Unified block ═══ */}
        <g>
          {/* Row labels */}
          {silos.map((silo, ri) => {
            const ly = cy + ri * gapY - 15;
            return (
              <g key={silo.label} style={{ animation: m ? `fadeSlideIn 0.4s ${0.5 + ri * 0.1}s both ease-out` : undefined, opacity: m ? undefined : 0 }}>
                <text x={cx - gapX - 28} y={ly + D * 0.5 + 3} textAnchor="end" fontSize="8" fontWeight="700" fill={silo.color} fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.06em" opacity="0.45">{silo.label.toUpperCase()}</text>
                <line x1={cx - gapX - 24} y1={ly + D * 0.5} x2={cx - gapX - 8} y2={ly + D * 0.5} stroke={silo.color} strokeWidth="1.2" strokeOpacity="0.2" />
              </g>
            );
          })}

          {/* Bricks */}
          {grid.map((pos, i) => {
            const tool = allTools[i];
            if (!tool) return null;
            const bx = cx + (pos.col - 0.5) * gapX;
            const by = cy + pos.row * gapY - 15;
            const delay = 0.6 + pos.row * 0.12 + pos.col * 0.06;
            return (
              <g key={tool.name} style={{ animation: m ? `brickSlotIn 0.5s ${delay}s both cubic-bezier(0.22, 1, 0.36, 1)` : undefined, opacity: m ? undefined : 0 }}>
                <IsoBrick cx={bx} cy={by} tool={tool} />
                {/* Connectors */}
                {pos.col < 1 && (
                  <circle cx={bx + W + 1} cy={by + H * 0.5} r="2" fill="#22C55E" fillOpacity="0.35">
                    <animate attributeName="fillOpacity" values="0.15;0.5;0.15" dur="2s" begin={`${delay + 0.3}s`} repeatCount="indefinite" />
                  </circle>
                )}
                {pos.row < 2 && (
                  <circle cx={bx} cy={by + H + D + 1.5} r="2" fill="#22C55E" fillOpacity="0.35">
                    <animate attributeName="fillOpacity" values="0.15;0.5;0.15" dur="2s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          <text x={cx} y={cy + 3 * gapY + 6} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.1em" opacity="0.2">STACK UNIFIÉE</text>
        </g>

        {/* Radial lines from block to MCP orbit */}
        <g opacity="0.06">
          {grid.map((pos, i) => {
            const bx = cx + (pos.col - 0.5) * gapX, by = cy + pos.row * gapY - 15;
            const angle = -70 + i * 28, rad = (angle * Math.PI) / 180;
            return <line key={`r${i}`} x1={bx} y1={by + D * 0.4} x2={cx + Math.cos(rad) * 148} y2={cy + 25 + Math.sin(rad) * 128} stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="3 4" />;
          })}
        </g>
      </svg>
    </div>
  );
}

/* ─── Isometric brick with SVG logo on top ─── */
function IsoBrick({ cx: bx, cy: by, tool }: {
  cx: number; cy: number;
  tool: { name: string; color: string; logo: React.FC<{ cx: number; cy: number; s: number }> };
}) {
  const Logo = tool.logo;
  const top = pts(bx, by - H, bx + W, by, bx, by + H, bx - W, by);
  const left = pts(bx - W, by, bx, by + H, bx, by + H + D, bx - W, by + D);
  const right = pts(bx + W, by, bx, by + H, bx, by + H + D, bx + W, by + D);
  const clipId = `t-${tool.name}`;

  return (
    <g style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.08))" }}>
      <defs><clipPath id={clipId}><polygon points={top} /></clipPath></defs>

      <polygon points={left} fill={lighten(tool.color, 18)} />
      <polygon points={left} fill="none" stroke={darken(tool.color, 20)} strokeWidth="0.6" strokeOpacity="0.15" strokeLinejoin="round" />

      <polygon points={right} fill={darken(tool.color, 5)} />
      <polygon points={right} fill="none" stroke={darken(tool.color, 20)} strokeWidth="0.6" strokeOpacity="0.15" strokeLinejoin="round" />

      <polygon points={top} fill={lighten(tool.color, 42)} />

      {/* Logo clipped to top diamond */}
      <g clipPath={`url(#${clipId})`}>
        <Logo cx={bx} cy={by} s={Math.min(W, H) * 0.7} />
      </g>

      <polygon points={top} fill="none" stroke={darken(tool.color, 20)} strokeWidth="0.6" strokeOpacity="0.2" strokeLinejoin="round" />
    </g>
  );
}

/* ════════════════════════════════════════
   SVG LOGOS — s = scale factor
   ════════════════════════════════════════ */

function HubSpotLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <circle r={s * 0.5} fill="none" stroke="#FF7A59" strokeWidth="1.4" />
      <circle r={s * 0.18} fill="#FF7A59" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1={0} y1={-s * 0.5} x2={0} y2={-s * 0.82} stroke="#FF7A59" strokeWidth="1.4" strokeLinecap="round" transform={`rotate(${a})`} />
      ))}
    </g>
  );
}

function LemlistLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <polygon points={`0,${-s * 0.7} ${s * 0.6},${s * 0.35} ${-s * 0.6},${s * 0.35}`} fill="none" stroke="#6C5CE7" strokeWidth="1.5" strokeLinejoin="round" />
      <circle r={s * 0.18} fill="#6C5CE7" />
    </g>
  );
}

function SalesforceLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <circle cx={-s * 0.28} cy={-s * 0.18} r={s * 0.42} fill="#00A1E0" />
      <circle cx={s * 0.22} cy={-s * 0.12} r={s * 0.38} fill="#00A1E0" />
      <circle cx={0} cy={s * 0.2} r={s * 0.36} fill="#00A1E0" />
    </g>
  );
}

function ClayLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <rect x={-s * 0.55} y={-s * 0.55} width={s * 1.1} height={s * 1.1} rx={s * 0.2} fill="#2D2D2D" />
      <text x="0" y={s * 0.35} textAnchor="middle" fontSize={s * 0.85} fontWeight="900" fill="white" fontFamily="Inter, system-ui, sans-serif">C</text>
    </g>
  );
}

function SlackLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  const d = s * 0.35;
  const r = s * 0.2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <circle cx={-d} cy={-d} r={r} fill="#36C5F0" />
      <circle cx={d} cy={-d} r={r} fill="#2EB67D" />
      <circle cx={-d} cy={d} r={r} fill="#E01E5A" />
      <circle cx={d} cy={d} r={r} fill="#ECB22E" />
    </g>
  );
}

function StripeLogo({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={s * 1.1} fill="white" fillOpacity="0.88" />
      <text x="0" y={s * 0.38} textAnchor="middle" fontSize={s * 1} fontWeight="800" fill="#635BFF" fontFamily="Inter, system-ui, sans-serif">S</text>
    </g>
  );
}

function ClaudeLogo({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${x + s},${y + s})`}>
      <path d={`M${s * 0.5} ${-s}L0 ${s}L${-s * 0.35} ${-s * 0.15}Z`} fill="#D4A27F" />
      <path d={`M${-s * 0.5} ${-s}L0 ${s}L${s * 0.35} ${-s * 0.15}Z`} fill="#E8C5A8" />
    </g>
  );
}

/* ─── Helpers ─── */
function pts(...c: number[]) {
  const r: string[] = [];
  for (let i = 0; i < c.length; i += 2) r.push(`${c[i]},${c[i + 1]}`);
  return r.join(" ");
}
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0")).join("");
}
function lighten(hex: string, p: number) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * p / 100, g + (255 - g) * p / 100, b + (255 - b) * p / 100);
}
function darken(hex: string, p: number) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r * (1 - p / 100), g * (1 - p / 100), b * (1 - p / 100));
}
