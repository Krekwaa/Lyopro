export function HeroEngineeringFlow() {
  return (
    <div className="hero-engineering-flow">
      <div className="hero-flow-grid" aria-hidden="true" />

      <svg className="hero-flow-svg hero-flow-svg-desktop" viewBox="0 0 1000 620" aria-hidden="true">
        <defs>
          <radialGradient id="hero-orb-desktop" cx="36%" cy="28%" r="72%">
            <stop offset="0" stopColor="#d4f5df" stopOpacity=".84" />
            <stop offset=".22" stopColor="#78ad8a" stopOpacity=".56" />
            <stop offset=".62" stopColor="#35644a" stopOpacity=".38" />
            <stop offset="1" stopColor="#183d2d" stopOpacity=".12" />
          </radialGradient>
          <filter id="hero-flow-glow-desktop" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="hero-flow-path-desktop" pathLength="1" d="M120 410 C275 350 350 480 500 415 S720 520 880 410" />
        </defs>

        <g className="hero-flow-background">
          <circle cx="115" cy="350" r="275" />
          <circle cx="500" cy="415" r="145" />
          <circle cx="500" cy="415" r="95" />
          <circle cx="880" cy="410" r="105" />
          <circle cx="850" cy="-110" r="350" />
          <circle cx="-80" cy="710" r="350" />
          <path d="M500 230V590M330 415H675" />
        </g>

        <use href="#hero-flow-path-desktop" className="hero-flow-path-base" />
        <use href="#hero-flow-path-desktop" className="hero-flow-path-progress" />
        <use href="#hero-flow-path-desktop" className="hero-flow-path-pulse" />

        <g className="hero-flow-orb hero-flow-orb-left">
          <circle cx="120" cy="410" r="58" fill="url(#hero-orb-desktop)" />
          <circle cx="120" cy="410" r="58" className="hero-flow-orb-edge" />
          <circle cx="120" cy="410" r="16" className="hero-flow-orb-ring" />
          <circle cx="120" cy="410" r="7" className="hero-flow-core" />
        </g>
        <g className="hero-flow-orb hero-flow-orb-center">
          <circle cx="500" cy="415" r="82" fill="url(#hero-orb-desktop)" />
          <circle cx="500" cy="415" r="82" className="hero-flow-orb-edge" />
          <circle cx="500" cy="415" r="40" className="hero-flow-orb-ring" />
          <circle cx="500" cy="415" r="15" className="hero-flow-orb-ring" />
          <circle cx="500" cy="415" r="8" className="hero-flow-core" />
        </g>
        <g className="hero-flow-orb hero-flow-orb-right">
          <circle cx="880" cy="410" r="62" fill="url(#hero-orb-desktop)" />
          <circle cx="880" cy="410" r="62" className="hero-flow-orb-edge" />
          <circle cx="880" cy="410" r="20" className="hero-flow-orb-ring" />
          <circle cx="880" cy="410" r="7" className="hero-flow-core" />
        </g>

        <circle className="hero-flow-traveler" r="6" filter="url(#hero-flow-glow-desktop)">
          <animateMotion dur="5.6s" begin=".35s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".42 0 .2 1">
            <mpath href="#hero-flow-path-desktop" />
          </animateMotion>
        </circle>
      </svg>

      <svg className="hero-flow-svg hero-flow-svg-mobile" viewBox="0 0 390 820" aria-hidden="true">
        <defs>
          <radialGradient id="hero-orb-mobile" cx="36%" cy="28%" r="72%">
            <stop offset="0" stopColor="#d4f5df" stopOpacity=".84" />
            <stop offset=".24" stopColor="#78ad8a" stopOpacity=".54" />
            <stop offset="1" stopColor="#183d2d" stopOpacity=".12" />
          </radialGradient>
          <filter id="hero-flow-glow-mobile" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="hero-flow-path-mobile" pathLength="1" d="M195 185 C155 265 230 335 195 410 S165 590 195 690" />
        </defs>
        <g className="hero-flow-background">
          <circle cx="195" cy="185" r="112" />
          <circle cx="195" cy="410" r="128" />
          <circle cx="195" cy="410" r="78" />
          <circle cx="195" cy="690" r="105" />
          <path d="M195 35V785" />
        </g>
        <use href="#hero-flow-path-mobile" className="hero-flow-path-base" />
        <use href="#hero-flow-path-mobile" className="hero-flow-path-progress" />
        <use href="#hero-flow-path-mobile" className="hero-flow-path-pulse" />
        <g className="hero-flow-orb hero-flow-orb-left">
          <circle cx="195" cy="185" r="48" fill="url(#hero-orb-mobile)" />
          <circle cx="195" cy="185" r="48" className="hero-flow-orb-edge" />
          <circle cx="195" cy="185" r="7" className="hero-flow-core" />
        </g>
        <g className="hero-flow-orb hero-flow-orb-center">
          <circle cx="195" cy="410" r="68" fill="url(#hero-orb-mobile)" />
          <circle cx="195" cy="410" r="68" className="hero-flow-orb-edge" />
          <circle cx="195" cy="410" r="30" className="hero-flow-orb-ring" />
          <circle cx="195" cy="410" r="8" className="hero-flow-core" />
        </g>
        <g className="hero-flow-orb hero-flow-orb-right">
          <circle cx="195" cy="690" r="50" fill="url(#hero-orb-mobile)" />
          <circle cx="195" cy="690" r="50" className="hero-flow-orb-edge" />
          <circle cx="195" cy="690" r="7" className="hero-flow-core" />
        </g>
        <circle className="hero-flow-traveler" r="6" filter="url(#hero-flow-glow-mobile)">
          <animateMotion dur="5.6s" begin=".35s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".42 0 .2 1">
            <mpath href="#hero-flow-path-mobile" />
          </animateMotion>
        </circle>
      </svg>

      <div className="hero-flow-stage hero-flow-stage-idea">
        <span>01</span>
        <i aria-hidden="true" />
        <h3>Your idea</h3>
        <p>Business goals<br />and requirements</p>
      </div>

      <div className="hero-flow-stage hero-flow-stage-engineering">
        <span>02</span>
        <i aria-hidden="true" />
        <h3>LyoPro</h3>
        <p>Engineering</p>
      </div>

      <div className="hero-flow-capabilities" aria-label="Engineering capabilities">
        <span>Architecture</span>
        <span>Integration</span>
        <span>Scalability</span>
        <span>Governance</span>
      </div>

      <div className="hero-flow-stage hero-flow-stage-product">
        <span>03</span>
        <i aria-hidden="true" />
        <h3>Working<br />product</h3>
        <p>Real business<br />value</p>
      </div>
    </div>
  );
}
