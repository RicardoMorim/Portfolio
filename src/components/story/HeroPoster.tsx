interface HeroPosterProps {
  isHidden: boolean;
}

/** Static dotted `<AI/>` shown until WebGL takes over, or for good where WebGL is unavailable. */
export default function HeroPoster({ isHidden }: HeroPosterProps) {
  return (
    <svg className={`hero-poster${isHidden ? " is-hidden" : ""}`} viewBox="0 0 520 180" role="presentation">
      <defs>
        <pattern id="poster-ink" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.2" className="hero-poster-ink" />
        </pattern>
        <pattern id="poster-signal" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.9" className="hero-poster-signal" />
        </pattern>
      </defs>
      <text x="260" y="138" textAnchor="middle">
        <tspan fill="url(#poster-signal)">&lt;</tspan>
        <tspan fill="url(#poster-ink)">AI</tspan>
        <tspan fill="url(#poster-signal)">/&gt;</tspan>
      </text>
    </svg>
  );
}
