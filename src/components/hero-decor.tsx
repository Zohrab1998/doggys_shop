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
      <span className="absolute top-[26%] right-[4%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
          <Truck className="h-4 w-4" />
        </span>
        {badgeDelivery}
      </span>
      <span className="absolute top-[23%] left-[47%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-navy shadow-lg xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22a06b] text-white">
          <ShieldCheck className="h-4 w-4" />
        </span>
        {badgeCare}
      </span>
    </div>
  );
}

/**
 * The blue shape behind the animals in the hero photo. It uses the photo's own coordinates
 * (1140 × 672), so its flat bottom edge is exactly the line the animals stand on.
 */
export function HeroBlob() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1140 672"
      preserveAspectRatio="none"
      overflow="visible"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="M30 672C-6 672-34 650-34 610V300C-34 165 60 88 190 82C300 77 360 128 440 160C520 192 575 196 650 170C745 136 820 116 915 146C1050 190 1168 262 1174 395V612C1174 648 1150 672 1112 672Z"
        fill="#4f9fd6"
        opacity="0.5"
      />
    </svg>
  );
}
