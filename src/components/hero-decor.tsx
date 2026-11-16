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

// Leaves sticking out from behind the blue shape: x, y (where the stem starts), angle, size.
const LEAVES: [number, number, number, number][] = [
  [120, 330, -150, 1.5],
  [150, 270, -115, 1.9],
  [205, 215, -88, 1.25],
  [330, 150, -100, 1.3],
  [372, 150, -62, 1.5],
  [470, 215, -38, 1.75],
  [520, 285, -12, 1.45],
  [545, 360, 14, 1.2],
];

/**
 * The darker blue shape with plant leaves that sits behind the animals in the hero photo.
 * Rendered inside the photo's box; it reaches above the photo to fill the space there.
 */
export function HeroBlob() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 560"
      preserveAspectRatio="none"
      overflow="visible"
      className="pointer-events-none absolute -top-[14%] -left-[4%] h-[114%] w-[108%] lg:-top-[36%] lg:h-[136%]"
    >
      <defs>
        <g id="hero-leaf">
          <path d="M0 0C14-24 54-36 100-26C78 4 38 16 0 0Z" />
          <path d="M6-2C36-11 64-19 92-25" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" />
        </g>
      </defs>

      <g fill="#3d97d3" opacity="0.6">
        {LEAVES.map(([x, y, angle, size], i) => (
          <use key={i} href="#hero-leaf" transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`} />
        ))}
      </g>

      <path
        d="M95 300C80 215 150 150 240 140C300 133 330 95 395 95C485 95 560 165 555 255C552 330 590 385 585 470C580 540 510 560 420 560H130C60 560 25 520 35 455C45 390 105 370 95 300Z"
        fill="#58ade3"
      />
      <path
        d="M150 330C145 265 200 215 270 210C330 205 350 175 405 178C470 182 510 235 505 300C500 360 530 410 520 470C512 525 460 545 400 545H190C130 545 105 505 112 455C118 405 152 385 150 330Z"
        fill="#6fbdea"
        opacity="0.75"
      />
      <circle cx="560" cy="150" r="14" fill="#ffffff" opacity="0.35" />
      <circle cx="70" cy="215" r="9" fill="#f4821f" opacity="0.45" />
    </svg>
  );
}
