/**
 * Flat-vector illustration of the animal cluster around a dog house, approximating the reference
 * design (design/design-1-homepage.jpg) — not a pixel-exact reproduction of the original
 * commissioned artwork, just a simple SVG built to match its composition and palette.
 */
export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 420" className="h-full w-full" role="img" aria-label="Dog, cat, rabbit, chameleon, parrot, and other pets gathered around a dog house">
      {/* ground shadow */}
      <ellipse cx="280" cy="392" rx="210" ry="16" fill="#2c5f78" opacity="0.08" />

      {/* birdhouse pole (right) */}
      <rect x="392" y="90" width="10" height="210" rx="4" fill="#8a5a3b" />
      <rect x="350" y="86" width="94" height="10" rx="4" fill="#8a5a3b" />
      {/* hanging ring for parrot */}
      <circle cx="372" cy="128" r="22" fill="none" stroke="#8a5a3b" strokeWidth="5" />
      {/* small birdhouse box on top */}
      <rect x="382" y="54" width="40" height="32" rx="4" fill="#f2c879" />
      <path d="M378 54 L402 30 L426 54 Z" fill="#ff6b1a" />
      <circle cx="402" cy="70" r="6" fill="#8a5a3b" />

      {/* small bird on birdhouse roof */}
      <g transform="translate(406,20)">
        <ellipse cx="8" cy="8" rx="10" ry="8" fill="#e05508" />
        <circle cx="16" cy="5" r="5" fill="#e05508" />
        <path d="M21 5 L28 7 L21 9 Z" fill="#2c5f78" />
      </g>

      {/* parrot perched on the ring */}
      <g transform="translate(358,96)">
        <ellipse cx="14" cy="26" rx="13" ry="18" fill="#ff6b1a" />
        <ellipse cx="14" cy="16" rx="9" ry="9" fill="#d34b3f" />
        <path d="M22 14 L34 18 L22 22 Z" fill="#f2c879" />
        <path d="M4 26 Q-6 36 4 46" stroke="#2c5f78" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="13" r="2" fill="#2c5f78" />
      </g>

      {/* chameleon on the pole, reaching toward centre */}
      <g transform="translate(300,150)">
        <path d="M60 10 Q30 -6 0 10" stroke="#7fae63" strokeWidth="7" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="14" rx="18" ry="11" fill="#8fc86b" />
        <circle cx="74" cy="10" r="7" fill="#8fc86b" />
        <circle cx="77" cy="8" r="1.6" fill="#2c5f78" />
        <path d="M45 14 Q20 22 2 10" stroke="#8fc86b" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* dog house */}
      <g transform="translate(190,150)">
        <rect x="0" y="70" width="170" height="120" rx="6" fill="#f2c879" />
        <path d="M-14 70 L85 0 L184 70 Z" fill="#d34b3f" />
        <rect x="60" y="120" width="50" height="70" rx="8" fill="#8a5a3b" />
      </g>

      {/* dog, sitting front-left */}
      <g transform="translate(130,210)">
        <ellipse cx="55" cy="130" rx="58" ry="40" fill="#d99355" />
        <ellipse cx="55" cy="60" rx="42" ry="40" fill="#e3a568" />
        <path d="M18 40 Q-6 70 14 100" stroke="#c07e42" strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M92 40 Q116 70 96 100" stroke="#c07e42" strokeWidth="18" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="58" r="5" fill="#2c5f78" />
        <circle cx="70" cy="58" r="5" fill="#2c5f78" />
        <ellipse cx="55" cy="76" rx="10" ry="7" fill="#2c5f78" />
        <path d="M40 86 Q55 96 70 86" stroke="#2c5f78" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* cat, sitting behind/beside rabbit */}
      <g transform="translate(250,228)">
        <ellipse cx="46" cy="110" rx="46" ry="34" fill="#9aa0a6" />
        <circle cx="46" cy="52" r="34" fill="#a7adb3" />
        <path d="M18 30 L28 4 L38 30 Z" fill="#a7adb3" />
        <path d="M54 30 L64 4 L74 30 Z" fill="#a7adb3" />
        <circle cx="36" cy="50" r="4" fill="#2c5f78" />
        <circle cx="58" cy="50" r="4" fill="#2c5f78" />
        <path d="M40 62 Q46 68 52 62" stroke="#2c5f78" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* white rabbit, front centre */}
      <g transform="translate(300,236)">
        <ellipse cx="42" cy="104" rx="42" ry="32" fill="#f7f7f5" />
        <circle cx="42" cy="54" r="30" fill="#ffffff" />
        <path d="M22 34 Q14 -18 30 4 Q34 34 30 40 Z" fill="#ffffff" stroke="#e7cfd6" strokeWidth="2" />
        <path d="M58 34 Q66 -18 50 4 Q46 34 50 40 Z" fill="#ffffff" stroke="#e7cfd6" strokeWidth="2" />
        <path d="M26 20 Q24 -4 30 8" fill="#f6c9d6" />
        <path d="M58 20 Q60 -4 54 8" fill="#f6c9d6" />
        <circle cx="33" cy="52" r="3.5" fill="#2c5f78" />
        <circle cx="51" cy="52" r="3.5" fill="#2c5f78" />
        <ellipse cx="42" cy="62" rx="4" ry="3" fill="#e9a0a0" />
      </g>

      {/* goldfish bowl, foreground left */}
      <g transform="translate(60,300)">
        <path d="M4 40 a46 34 0 1 0 92 0 a46 34 0 1 0 -92 0 Z" fill="#cdeefc" fillOpacity="0.7" stroke="#2c5f78" strokeWidth="3" />
        <path d="M14 42 Q50 56 86 42" stroke="#9fd8ef" strokeWidth="3" fill="none" />
        <g transform="translate(38,36)">
          <ellipse cx="12" cy="8" rx="12" ry="8" fill="#ff6b1a" />
          <path d="M0 8 L-10 2 L-10 14 Z" fill="#e05508" />
        </g>
      </g>

      {/* hamster wheel, foreground right */}
      <g transform="translate(410,290)">
        <circle cx="40" cy="40" r="38" fill="none" stroke="#8a5a3b" strokeWidth="6" />
        <circle cx="40" cy="40" r="24" fill="none" stroke="#c9975f" strokeWidth="4" />
        <circle cx="34" cy="48" r="10" fill="#f2c879" />
        <circle cx="30" cy="45" r="1.6" fill="#2c5f78" />
      </g>

      {/* turtle, foreground centre */}
      <g transform="translate(200,340)">
        <ellipse cx="30" cy="20" rx="30" ry="18" fill="#7fae63" />
        <path d="M8 20 a22 12 0 1 0 44 0 a22 12 0 1 0 -44 0 Z" fill="#5f9150" opacity="0.5" />
        <circle cx="4" cy="14" r="8" fill="#8fc86b" />
        <circle cx="1" cy="12" r="1.4" fill="#2c5f78" />
      </g>
    </svg>
  );
}
