import Image from "next/image";

// Traces the same curve as the wave backdrop (bulges left through the middle), trailing from
// near the wave boundary at the top down to the lower-left, shrinking as it goes - matching the
// reference image's paw trail rather than a straight diagonal line.
const POSITIONS = [
  { top: "13%", left: "58%", size: 34 },
  { top: "16%", left: "49%", size: 28 },
  { top: "27%", left: "43%", size: 26 },
  { top: "39%", left: "38%", size: 24 },
  { top: "53%", left: "34%", size: 22 },
  { top: "67%", left: "31%", size: 20 },
  { top: "81%", left: "29%", size: 18 },
  { top: "93%", left: "28%", size: 16 },
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
