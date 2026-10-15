/**
 * Flat-vector illustration of the animal cluster around a dog house, approximating the latest
 * reference image (parrot swing to the left of the house, perch/birdhouse/chameleon to the
 * right, dog-rabbit-cat-turtle-fishbowl-hamster-wheel across the foreground). Hand-built from
 * simple shapes, not a pixel extraction of the original artwork.
 */
export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 620 460" className="h-full w-full" role="img" aria-label="Dog, cat, rabbit, chameleon, parrot, and other pets gathered around a dog house">
      <ellipse cx="320" cy="430" rx="260" ry="18" fill="#2c5f78" opacity="0.08" />

      {/* hanging wire for the parrot swing, left of the house */}
      <line x1="230" y1="0" x2="230" y2="150" stroke="#2c5f78" strokeWidth="2" opacity="0.4" />
      <circle cx="230" cy="168" r="26" fill="none" stroke="#2c5f78" strokeWidth="4" opacity="0.6" />

      {/* perch pole with birdhouse, right of the house */}
      <rect x="452" y="110" width="10" height="230" rx="4" fill="#8a5a3b" />
      <rect x="452" y="150" width="60" height="9" rx="4" fill="#8a5a3b" />
      <rect x="440" y="76" width="44" height="34" rx="4" fill="#f2c879" />
      <path d="M436 76 L462 48 L488 76 Z" fill="#d34b3f" />
      <g transform="translate(442,42)">
        <ellipse cx="10" cy="10" rx="13" ry="10" fill="#8fc86b" />
        <circle cx="20" cy="6" r="6" fill="#8fc86b" />
        <path d="M26 6 L34 8 L26 11 Z" fill="#e05508" />
      </g>

      {/* chameleon wrapped around the pole */}
      <g transform="translate(470,190)">
        <path d="M-18 -10 Q10 -24 10 0 Q10 24 -10 20" stroke="#8fc86b" strokeWidth="9" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="-14" rx="16" ry="11" fill="#8fc86b" />
        <circle cx="-36" cy="-16" r="6" fill="#8fc86b" />
        <circle cx="-38" cy="-18" r="1.6" fill="#2c5f78" />
      </g>

      {/* parrot on the hanging swing */}
      <g transform="translate(204,142)">
        <ellipse cx="14" cy="28" rx="14" ry="19" fill="#ff6b1a" />
        <ellipse cx="14" cy="17" rx="10" ry="10" fill="#d34b3f" />
        <path d="M23 15 L36 19 L23 23 Z" fill="#f2c879" />
        <path d="M4 28 Q-7 40 4 50" stroke="#2c5f78" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="14" r="2" fill="#2c5f78" />
      </g>

      {/* dog house */}
      <g transform="translate(250,180)">
        <rect x="0" y="80" width="190" height="130" rx="6" fill="#f2c879" />
        <path d="M-16 80 L95 0 L206 80 Z" fill="#d34b3f" />
        <rect x="68" y="136" width="56" height="74" rx="8" fill="#8a5a3b" />
      </g>

      {/* dog, leftmost of the foreground cluster */}
      <g transform="translate(60,210)">
        <ellipse cx="60" cy="150" rx="66" ry="46" fill="#d99355" />
        <ellipse cx="60" cy="68" rx="48" ry="46" fill="#e3a568" />
        <path d="M18 46 Q-10 80 14 114" stroke="#c07e42" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M102 46 Q130 80 106 114" stroke="#c07e42" strokeWidth="20" strokeLinecap="round" fill="none" />
        <circle cx="46" cy="66" r="5.5" fill="#2c5f78" />
        <circle cx="76" cy="66" r="5.5" fill="#2c5f78" />
        <ellipse cx="60" cy="86" rx="11" ry="8" fill="#2c5f78" />
        <path d="M44 98 Q60 108 76 98" stroke="#2c5f78" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="34" y="104" width="52" height="10" rx="5" fill="#d34b3f" />
      </g>

      {/* turtle + food bowl, bottom-left foreground */}
      <g transform="translate(40,350)">
        <rect x="0" y="22" width="54" height="16" rx="8" fill="#d34b3f" />
        <ellipse cx="27" cy="22" rx="24" ry="8" fill="#8a5a3b" opacity="0.6" />
      </g>
      <g transform="translate(110,360)">
        <ellipse cx="34" cy="24" rx="34" ry="20" fill="#7fae63" />
        <ellipse cx="34" cy="22" rx="26" ry="13" fill="#5f9150" opacity="0.5" />
        <circle cx="4" cy="16" r="9" fill="#8fc86b" />
        <circle cx="1" cy="13" r="1.6" fill="#2c5f78" />
      </g>

      {/* white rabbit, centre-front */}
      <g transform="translate(260,250)">
        <ellipse cx="46" cy="112" rx="46" ry="34" fill="#f7f7f5" />
        <circle cx="46" cy="58" r="32" fill="#ffffff" />
        <path d="M24 36 Q16 -20 32 4 Q37 36 32 42 Z" fill="#ffffff" stroke="#e7cfd6" strokeWidth="2" />
        <path d="M64 36 Q73 -20 56 4 Q50 36 56 42 Z" fill="#ffffff" stroke="#e7cfd6" strokeWidth="2" />
        <path d="M28 22 Q26 -2 32 10" fill="#f6c9d6" />
        <path d="M64 22 Q66 -2 59 10" fill="#f6c9d6" />
        <circle cx="36" cy="56" r="3.8" fill="#2c5f78" />
        <circle cx="56" cy="56" r="3.8" fill="#2c5f78" />
        <ellipse cx="46" cy="67" rx="4.2" ry="3.2" fill="#e9a0a0" />
      </g>

      {/* cat, right of the rabbit */}
      <g transform="translate(350,246)">
        <ellipse cx="46" cy="114" rx="48" ry="36" fill="#9c7a5c" />
        <circle cx="46" cy="56" r="34" fill="#a7876a" />
        <path d="M18 34 L28 6 L38 34 Z" fill="#a7876a" />
        <path d="M54 34 L64 6 L74 34 Z" fill="#a7876a" />
        <circle cx="36" cy="54" r="4" fill="#2c5f78" />
        <circle cx="58" cy="54" r="4" fill="#2c5f78" />
        <path d="M40 66 Q46 72 52 66" stroke="#2c5f78" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="30" y="76" width="34" height="8" rx="4" fill="#d34b3f" />
      </g>

      {/* goldfish bowl, centre-right foreground */}
      <g transform="translate(430,320)">
        <path d="M4 42 a48 36 0 1 0 96 0 a48 36 0 1 0 -96 0 Z" fill="#cdeefc" fillOpacity="0.7" stroke="#2c5f78" strokeWidth="3" />
        <path d="M14 44 Q52 58 90 44" stroke="#9fd8ef" strokeWidth="3" fill="none" />
        <g transform="translate(26,38)">
          <ellipse cx="12" cy="8" rx="13" ry="9" fill="#ff6b1a" />
          <path d="M0 8 L-11 2 L-11 15 Z" fill="#e05508" />
        </g>
        <g transform="translate(54,46)">
          <ellipse cx="10" cy="6" rx="10" ry="7" fill="#d34b3f" />
          <path d="M0 6 L-8 2 L-8 11 Z" fill="#b93a2f" />
        </g>
      </g>

      {/* hamster wheel, far right */}
      <g transform="translate(540,300)">
        <circle cx="40" cy="40" r="40" fill="none" stroke="#b03a2f" strokeWidth="7" />
        <circle cx="40" cy="40" r="25" fill="none" stroke="#d4584a" strokeWidth="4" />
        <circle cx="33" cy="50" r="11" fill="#f2c879" />
        <circle cx="29" cy="47" r="1.7" fill="#2c5f78" />
      </g>
    </svg>
  );
}
