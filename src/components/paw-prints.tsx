const POSITIONS = [
  { top: "20%", left: "48%", size: 34 },
  { top: "28%", left: "44%", size: 22 },
  { top: "38%", left: "38%", size: 20 },
  { top: "52%", left: "36%", size: 26 },
  { top: "68%", left: "33%", size: 20 },
  { top: "80%", left: "30%", size: 24 },
  { top: "92%", left: "27%", size: 18 },
];

export function PawIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-brand-orange">
      {POSITIONS.map((p, i) => (
        <span key={i} className="absolute" style={{ top: p.top, left: p.left }}>
          <PawIcon size={p.size} />
        </span>
      ))}
    </div>
  );
}
