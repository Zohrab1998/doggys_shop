import { ShieldCheck, Truck } from "lucide-react";

/** A filled paw print (own drawing), colored through `currentColor`. */
export function Paw({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} style={style} fill="currentColor">
      <ellipse cx="13" cy="27" rx="6" ry="8.5" transform="rotate(-22 13 27)" />
      <ellipse cx="25" cy="14" rx="6.5" ry="9.5" transform="rotate(-8 25 14)" />
      <ellipse cx="40" cy="14" rx="6.5" ry="9.5" transform="rotate(8 40 14)" />
      <ellipse cx="52" cy="27" rx="6" ry="8.5" transform="rotate(22 52 27)" />
      <path d="M32.5 31c-10 0-17.5 9-17.5 17c0 6 5 9.5 10.5 8.3c2.8-.6 4.8-1.6 7-1.6s4.2 1 7 1.6c5.5 1.2 10.5-2.3 10.5-8.3c0-8-7.5-17-17.5-17z" />
    </svg>
  );
}

// A trail of steps that walks from the headline, over the top, down towards the pets.
// left/top are % of the hero; `turn` points each print along the path.
const TRAIL = [
  { left: 45, top: 33, turn: 38, size: 30 },
  { left: 49, top: 22, turn: 52, size: 32 },
  { left: 54.5, top: 14, turn: 66, size: 34 },
  { left: 60.5, top: 7.5, turn: 78, size: 36 },
  { left: 67, top: 6, turn: 96, size: 38 },
  { left: 73.5, top: 8.5, turn: 112, size: 36 },
  { left: 79.5, top: 14, turn: 128, size: 34 },
];

// Fewer, smaller steps for phones and tablets, in the gap above the parrot and hamster.
const TRAIL_SMALL = [
  { right: 36, top: 71, turn: 80, size: 18 },
  { right: 22, top: 70, turn: 100, size: 20 },
  { right: 8, top: 72.5, turn: 125, size: 22 },
];

/**
 * Decoration behind and around the hero photo: a soft cloud shape, a paw-print trail that
 * appears step by step, and two floating badges. Purely visual (hidden from screen readers).
 */
export default function HeroDecor({ badgeDelivery, badgeCare }: { badgeDelivery: string; badgeCare: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Cloud behind the pets (large screens) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-y-0 right-0 hidden h-full w-[58%] lg:block"
      >
        <path d="M34 0C14 12 30 30 16 46C2 62 10 84 30 100H100V0Z" fill="#ffffff" opacity="0.55" />
        <path d="M52 0C38 14 50 28 40 44C30 60 38 82 54 100H100V0Z" fill="#ffffff" opacity="0.5" />
      </svg>

      {/* Soft color dots */}
      <span className="absolute top-[18%] right-[7%] hidden h-5 w-5 rounded-full bg-[#7b61d9]/25 lg:block" />
      <span className="absolute top-[44%] right-[2.5%] hidden h-8 w-8 rounded-full bg-[#22a06b]/20 lg:block" />
      <span className="absolute top-[10%] left-[42%] hidden h-3 w-3 rounded-full bg-[#e6508a]/30 lg:block" />
      <span className="absolute bottom-[16%] left-[47%] hidden h-6 w-6 rounded-full bg-brand-orange/20 lg:block" />

      {/* Paw trail — large screens */}
      {TRAIL.map((step, i) => (
        <span
          key={i}
          className="paw-step absolute hidden text-brand-orange lg:block"
          style={{ left: `${step.left}%`, top: `${step.top}%`, animationDelay: `${0.25 + i * 0.16}s` }}
        >
          <Paw
            style={{
              width: step.size,
              height: step.size,
              // Alternate left and right feet a little off the centre line.
              transform: `rotate(${step.turn}deg) translateY(${i % 2 ? 7 : -7}px)`,
            }}
          />
        </span>
      ))}

      {/* Paw trail — phones and tablets */}
      {TRAIL_SMALL.map((step, i) => (
        <span
          key={i}
          className="paw-step absolute text-brand-orange/80 lg:hidden"
          style={{ right: `${step.right}%`, top: `${step.top}%`, animationDelay: `${0.25 + i * 0.16}s` }}
        >
          <Paw style={{ width: step.size, height: step.size, transform: `rotate(${step.turn}deg)` }} />
        </span>
      ))}

      {/* Floating badges */}
      <span className="animal-bob absolute top-[26%] right-[4%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
          <Truck className="h-4 w-4" />
        </span>
        {badgeDelivery}
      </span>
      <span className="animal-bob absolute top-[36%] left-[51%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg [animation-delay:2.3s] xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22a06b] text-white">
          <ShieldCheck className="h-4 w-4" />
        </span>
        {badgeCare}
      </span>
    </div>
  );
}
