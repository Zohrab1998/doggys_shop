import Image from "next/image";

const POSITIONS = [
  { top: "20%", left: "48%", size: 44 },
  { top: "28%", left: "44%", size: 30 },
  { top: "38%", left: "38%", size: 26 },
  { top: "52%", left: "36%", size: 34 },
  { top: "68%", left: "33%", size: 26 },
  { top: "80%", left: "30%", size: 32 },
  { top: "92%", left: "27%", size: 24 },
];

export default function PawPrints() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {POSITIONS.map((p, i) => (
        <span key={i} className="absolute" style={{ top: p.top, left: p.left }}>
          <Image src="/pets/paw.png" alt="" width={p.size} height={p.size} />
        </span>
      ))}
    </div>
  );
}
