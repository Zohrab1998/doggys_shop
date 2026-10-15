const POSITIONS = [
  { top: "6%", left: "4%", size: 28, rotate: -18 },
  { top: "14%", left: "46%", size: 20, rotate: 12 },
  { top: "32%", left: "2%", size: 22, rotate: 24 },
  { top: "46%", left: "41%", size: 26, rotate: -8 },
  { top: "58%", left: "10%", size: 18, rotate: 30 },
  { top: "70%", left: "48%", size: 24, rotate: -22 },
  { top: "10%", left: "90%", size: 22, rotate: 16 },
  { top: "55%", left: "93%", size: 20, rotate: -14 },
];

function PawIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="16" r="5" />
      <circle cx="4.5" cy="10" r="2.4" />
      <circle cx="9.5" cy="5.5" r="2.4" />
      <circle cx="14.5" cy="5.5" r="2.4" />
      <circle cx="19.5" cy="10" r="2.4" />
    </svg>
  );
}

export default function PawPrints() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-brand-orange/20">
      {POSITIONS.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{ top: p.top, left: p.left, transform: `rotate(${p.rotate}deg)` }}
        >
          <PawIcon size={p.size} />
        </span>
      ))}
    </div>
  );
}
