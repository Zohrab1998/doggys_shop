import { ShieldCheck, Truck } from "lucide-react";

/** A filled paw print (own drawing), colored through `currentColor`. */
/** The paw shapes on a 64×64 grid, for use inside another SVG. */
export function PawShape() {
  return (
    <>
      <ellipse cx="13" cy="27" rx="6" ry="8.5" transform="rotate(-22 13 27)" />
      <ellipse cx="25" cy="14" rx="6.5" ry="9.5" transform="rotate(-8 25 14)" />
      <ellipse cx="40" cy="14" rx="6.5" ry="9.5" transform="rotate(8 40 14)" />
      <ellipse cx="52" cy="27" rx="6" ry="8.5" transform="rotate(22 52 27)" />
      <path d="M32.5 31c-10 0-17.5 9-17.5 17c0 6 5 9.5 10.5 8.3c2.8-.6 4.8-1.6 7-1.6s4.2 1 7 1.6c5.5 1.2 10.5-2.3 10.5-8.3c0-8-7.5-17-17.5-17z" />
    </>
  );
}

/** A filled paw print (own drawing), colored through `currentColor`. */
export function Paw({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} style={style} fill="currentColor">
      <PawShape />
    </svg>
  );
}

/**
 * Decoration around the hero photo: a few color dots and two floating badges. Purely visual (hidden from screen readers).
 */
export default function HeroDecor({ badgeDelivery, badgeCare }: { badgeDelivery: string; badgeCare: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {/* Soft color dots */}
      <span className="absolute top-[18%] right-[7%] hidden h-5 w-5 rounded-full bg-[#7b61d9]/25 lg:block" />
      <span className="absolute top-[44%] right-[2.5%] hidden h-8 w-8 rounded-full bg-[#22a06b]/20 lg:block" />
      <span className="absolute bottom-[16%] left-[47%] hidden h-6 w-6 rounded-full bg-brand-orange/20 lg:block" />

      {/* Floating badges */}
      <span className="animal-bob absolute top-[26%] right-[4%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
          <Truck className="h-4 w-4" />
        </span>
        {badgeDelivery}
      </span>
      <span className="animal-bob absolute top-[23%] left-[47%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg [animation-delay:2.3s] xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22a06b] text-white">
          <ShieldCheck className="h-4 w-4" />
        </span>
        {badgeCare}
      </span>
    </div>
  );
}

/**
 * A soft blue shape that sits behind the animals in the hero photo. Rendered inside the photo's
 * box, a little larger than the photo so its edges show around the animals.
 */
export function HeroBlob() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 420"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-[6%] left-[3%] h-[106%] w-[94%]"
    >
      <path
        d="M70 220C60 140 130 70 225 64C290 60 320 30 390 34C490 40 560 110 552 200C548 260 580 300 572 350C564 405 515 420 450 420H140C80 420 40 395 44 345C48 300 76 275 70 220Z"
        fill="#5aa9dc"
        opacity="0.45"
      />
    </svg>
  );
}

/** A Doggy's Shop bandana, drawn for the page edge as decoration. */
export function Bandana({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 240 250" aria-hidden className={className} style={style}>
      <defs>
        <linearGradient id="bandana-cloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ecdc" />
          <stop offset="1" stopColor="#e8d6bb" />
        </linearGradient>
        <path id="bandana-text" d="M40 100Q117 120 190 100" />
      </defs>
      {/* tie ends */}
      <path d="M196 46C214 34 232 40 236 56C222 54 210 58 198 64Z" fill="#e3cfb0" />
      <path d="M200 58C216 66 224 84 216 98C206 88 196 80 188 74Z" fill="#dcc6a5" />
      {/* folded band */}
      <path d="M12 40Q120 62 204 44L208 66Q120 84 16 62Z" fill="#eadbc3" />
      {/* triangle */}
      <path d="M18 60Q120 84 206 64L130 232Q120 248 108 232Z" fill="url(#bandana-cloth)" />
      {/* folds */}
      <path d="M120 82Q118 160 118 236" fill="none" stroke="#d6c09e" strokeWidth="3" opacity="0.5" />
      <path d="M60 80Q90 140 112 226" fill="none" stroke="#d6c09e" strokeWidth="2" opacity="0.4" />
      {/* stitching */}
      <path
        d="M30 70Q120 92 194 74L128 220Q120 232 112 220Z"
        fill="none"
        stroke="#c9ae86"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      {/* knot */}
      <ellipse cx="200" cy="56" rx="13" ry="11" fill="#dcc6a5" />
      <text fontSize="19" fontWeight="800" fill="#0b4470" fontFamily="inherit">
        <textPath href="#bandana-text" startOffset="50%" textAnchor="middle">
          Doggy&apos;s Shop
        </textPath>
      </text>
      <g transform="translate(94 128) scale(0.8)" fill="#f4821f">
        <PawShape />
      </g>
    </svg>
  );
}
