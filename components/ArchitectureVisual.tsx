export function ArchitectureVisual({
  labels,
  statusLabel,
  status,
  aria,
}: {
  labels: readonly string[];
  statusLabel: string;
  status: string;
  aria: string;
}) {
  return (
    <div className="architecture-visual" aria-label={aria}>
      <div className="visual-grid" />
      <svg viewBox="0 0 700 560" role="img">
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0" stopColor="#a7cbb9" stopOpacity=".15"/>
            <stop offset=".5" stopColor="#d6f7e7" stopOpacity=".8"/>
            <stop offset="1" stopColor="#a7cbb9" stopOpacity=".1"/>
          </linearGradient>
        </defs>
        <g className="visual-lines" fill="none" stroke="url(#line)">
          <path d="M90 285H230C270 285 270 155 310 155H430"/>
          <path d="M90 285H270C310 285 310 285 350 285H580"/>
          <path d="M90 285H230C270 285 270 415 310 415H430"/>
          <path d="M480 155V230C480 260 510 285 540 285"/>
          <path d="M480 415V340C480 310 510 285 540 285"/>
        </g>
        <g className="visual-nodes">
          <circle cx="90" cy="285" r="48"/><circle cx="90" cy="285" r="7" className="node-core"/>
          <rect x="430" y="115" width="100" height="80" rx="18"/><circle cx="480" cy="155" r="6" className="node-core"/>
          <rect x="430" y="375" width="100" height="80" rx="18"/><circle cx="480" cy="415" r="6" className="node-core"/>
          <rect x="540" y="245" width="100" height="80" rx="18"/><circle cx="590" cy="285" r="6" className="node-core"/>
          <circle cx="350" cy="285" r="25"/><circle cx="350" cy="285" r="5" className="node-core"/>
        </g>
        <g className="visual-labels">
          <text x="58" y="355">{labels[0]}</text>
          <text x="438" y="100">{labels[1]}</text>
          <text x="428" y="490">{labels[2]}</text>
          <text x="548" y="360">{labels[3]}</text>
        </g>
        <circle className="travel travel-one" cx="0" cy="0" r="4"/>
        <circle className="travel travel-two" cx="0" cy="0" r="4"/>
      </svg>
      <div className="visual-caption"><span>{statusLabel}</span><strong><i /> {status}</strong></div>
    </div>
  );
}
