export default function WorkflowIllustration() {
  return (
    <svg
      viewBox="0 0 720 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
    >
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E5E5" strokeWidth="0.5" />
        </pattern>
        <filter id="shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.06" />
        </filter>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4D4D4" />
          <stop offset="100%" stopColor="#A3A3A3" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="720" height="480" fill="url(#grid)" rx="16" />

      {/* ═══ CONNECTIONS ═══ */}
      {/* Trigger → AI Scoring */}
      <path
        d="M 200 130 L 200 160 Q 200 175 215 175 L 300 175 Q 315 175 315 190 L 315 210"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Trigger → Enrich */}
      <path
        d="M 200 130 L 200 160 Q 200 175 185 175 L 120 175 Q 105 175 105 190 L 105 210"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* AI Scoring → Switch */}
      <path
        d="M 315 290 L 315 310 Q 315 325 330 325 L 390 325 Q 405 325 405 340 L 405 350"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Enrich → Switch */}
      <path
        d="M 105 290 L 105 310 Q 105 325 120 325 L 390 325 Q 405 325 405 340 L 405 350"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Switch → Notify Sales */}
      <path
        d="M 370 400 L 340 400 Q 325 400 325 415 L 325 430 Q 325 445 310 445 L 260 445 Q 245 445 245 432 L 245 420"
        stroke="#22C55E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="0"
      />
      {/* Switch → Nurture */}
      <path
        d="M 440 400 L 470 400 Q 485 400 485 415 L 485 430 Q 485 445 500 445 L 540 445 Q 555 445 555 432 L 555 420"
        stroke="#A3A3A3"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />

      {/* ═══ CONNECTOR DOTS ═══ */}
      <circle cx="200" cy="130" r="4" fill="white" stroke="#D4D4D4" strokeWidth="1.5" />
      <circle cx="315" cy="290" r="4" fill="white" stroke="#D4D4D4" strokeWidth="1.5" />
      <circle cx="105" cy="290" r="4" fill="white" stroke="#D4D4D4" strokeWidth="1.5" />
      <circle cx="370" cy="400" r="4" fill="white" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="440" cy="400" r="4" fill="white" stroke="#A3A3A3" strokeWidth="1.5" />

      {/* ═══ NODE 1: Trigger — Deal Updated ═══ */}
      <g filter="url(#shadow)">
        <rect x="110" y="50" width="180" height="80" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        {/* Tag */}
        <rect x="110" y="44" width="62" height="22" rx="6" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="1" />
        <text x="127" y="58" fontSize="9" fontWeight="600" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Trigger</text>
        {/* Icon */}
        <rect x="125" y="68" width="28" height="28" rx="6" fill="#0A0A0A" />
        <text x="133" y="87" fontSize="14" fill="white" fontFamily="Inter, system-ui, sans-serif">⚡</text>
        {/* Text */}
        <text x="162" y="81" fontSize="13" fontWeight="600" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">Deal updated</text>
        <text x="162" y="97" fontSize="10" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">When stage changes</text>
        {/* Status badge */}
        <rect x="237" y="56" width="46" height="18" rx="9" fill="#F0FDF4" />
        <text x="248" y="68" fontSize="8" fontWeight="600" fill="#22C55E" fontFamily="Inter, system-ui, sans-serif">Active</text>
      </g>

      {/* ═══ NODE 2: Enrich Data ═══ */}
      <g filter="url(#shadow)">
        <rect x="25" y="210" width="160" height="80" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        {/* Icon */}
        <rect x="40" y="228" width="28" height="28" rx="6" fill="#0A0A0A" />
        <text x="47" y="247" fontSize="14" fill="white" fontFamily="Inter, system-ui, sans-serif">🔍</text>
        {/* Text */}
        <text x="76" y="241" fontSize="13" fontWeight="600" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">Enrich</text>
        <text x="76" y="257" fontSize="10" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Apollo + Clearbit</text>
        {/* Tag */}
        <rect x="40" y="268" width="56" height="16" rx="4" fill="#F5F5F5" />
        <text x="50" y="279" fontSize="8" fontWeight="500" fill="#737373" fontFamily="Inter, system-ui, sans-serif">Enrichment</text>
      </g>

      {/* ═══ NODE 3: AI Scoring ═══ */}
      <g filter="url(#shadow)">
        <rect x="225" y="210" width="180" height="80" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        {/* Accent line */}
        <rect x="225" y="210" width="180" height="4" rx="2" fill="url(#greenGrad)" />
        {/* Icon */}
        <rect x="240" y="230" width="28" height="28" rx="6" fill="#0A0A0A" />
        <text x="247" y="249" fontSize="14" fill="white" fontFamily="Inter, system-ui, sans-serif">🤖</text>
        {/* Text */}
        <text x="276" y="243" fontSize="13" fontWeight="600" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">AI Lead Scoring</text>
        <text x="276" y="259" fontSize="10" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Score &amp; qualify with AI</text>
        {/* Tag */}
        <rect x="240" y="268" width="28" height="16" rx="4" fill="#F5F5F5" />
        <text x="250" y="279" fontSize="8" fontWeight="500" fill="#737373" fontFamily="Inter, system-ui, sans-serif">IA</text>
        {/* Score preview */}
        <rect x="354" y="230" width="40" height="28" rx="6" fill="#F0FDF4" />
        <text x="362" y="249" fontSize="13" fontWeight="700" fill="#22C55E" fontFamily="Inter, system-ui, sans-serif">87</text>
      </g>

      {/* ═══ NODE 4: Switch / Condition ═══ */}
      <g filter="url(#shadow)">
        <rect x="330" y="350" width="150" height="56" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        {/* Diamond icon */}
        <g transform="translate(345, 366)">
          <rect width="24" height="24" rx="4" fill="#0A0A0A" />
          <path d="M12 6L18 12L12 18L6 12Z" fill="none" stroke="white" strokeWidth="1.5" />
        </g>
        {/* Text */}
        <text x="376" y="379" fontSize="12" fontWeight="600" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">Route</text>
        <text x="376" y="393" fontSize="9" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Score ≥ 70 ?</text>
        {/* Tag */}
        <rect x="438" y="361" width="34" height="16" rx="4" fill="#F5F5F5" />
        <text x="443" y="372" fontSize="8" fontWeight="500" fill="#737373" fontFamily="Inter, system-ui, sans-serif">Cond.</text>
      </g>

      {/* ═══ NODE 5: Notify Sales (Yes branch) ═══ */}
      <g filter="url(#shadow)">
        <rect x="170" y="395" width="150" height="50" rx="10" fill="white" stroke="#22C55E" strokeWidth="1.5" />
        {/* Icon */}
        <rect x="182" y="408" width="24" height="24" rx="5" fill="#22C55E" />
        <text x="188" y="425" fontSize="12" fill="white" fontFamily="Inter, system-ui, sans-serif">✓</text>
        {/* Text */}
        <text x="214" y="423" fontSize="12" fontWeight="600" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">Notify Sales</text>
        <text x="214" y="436" fontSize="9" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Slack + assign owner</text>
        {/* Label */}
        <rect x="192" y="388" width="42" height="16" rx="4" fill="#F0FDF4" />
        <text x="199" y="399" fontSize="8" fontWeight="600" fill="#22C55E" fontFamily="Inter, system-ui, sans-serif">Hot 🔥</text>
      </g>

      {/* ═══ NODE 6: Nurture (No branch) ═══ */}
      <g filter="url(#shadow)" opacity="0.5">
        <rect x="490" y="395" width="140" height="50" rx="10" fill="white" stroke="#D4D4D4" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Icon */}
        <rect x="502" y="408" width="24" height="24" rx="5" fill="#D4D4D4" />
        <text x="508" y="425" fontSize="12" fill="white" fontFamily="Inter, system-ui, sans-serif">✉</text>
        {/* Text */}
        <text x="534" y="423" fontSize="12" fontWeight="600" fill="#737373" fontFamily="Inter, system-ui, sans-serif">Nurture</text>
        <text x="534" y="436" fontSize="9" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Add to sequence</text>
        {/* Label */}
        <rect x="512" y="388" width="46" height="16" rx="4" fill="#F5F5F5" />
        <text x="520" y="399" fontSize="8" fontWeight="500" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Warm</text>
      </g>

      {/* ═══ FLOATING ELEMENTS ═══ */}
      {/* Metrics card top-right */}
      <g filter="url(#shadow)">
        <rect x="520" y="70" width="160" height="90" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1" />
        <text x="536" y="92" fontSize="10" fontWeight="500" fill="#A3A3A3" fontFamily="Inter, system-ui, sans-serif">Pipeline this month</text>
        <text x="536" y="118" fontSize="24" fontWeight="700" fill="#0A0A0A" fontFamily="Inter, system-ui, sans-serif">€247K</text>
        <rect x="620" y="102" width="44" height="18" rx="9" fill="#F0FDF4" />
        <text x="629" y="114" fontSize="9" fontWeight="600" fill="#22C55E" fontFamily="Inter, system-ui, sans-serif">+18%</text>
        {/* Mini sparkline */}
        <polyline
          points="536,145 548,140 560,142 572,135 584,138 596,130 608,132 620,125 632,128 644,120 656,118 668,112"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Notification badge bottom-right */}
      <g filter="url(#shadow)">
        <rect x="560" y="250" width="140" height="52" rx="10" fill="#0A0A0A" />
        <text x="576" y="272" fontSize="10" fontWeight="500" fill="#737373" fontFamily="Inter, system-ui, sans-serif">New qualified lead</text>
        <text x="576" y="289" fontSize="11" fontWeight="600" fill="white" fontFamily="Inter, system-ui, sans-serif">Acme Corp — 85/100</text>
      </g>

      {/* Animated pulse dot on trigger */}
      <circle cx="287" cy="64" r="3" fill="#22C55E">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
