import { Paw } from "@/components/hero-decor";

// A handful of faint paw prints, small and large, down the edges of every page. Positions
// are percentages of the page's height, so longer pages spread them out further.
const PAWS: { top: number; side: "left" | "right"; offset: number; size: number; turn: number; tone: "orange" | "blue" }[] = [
  { top: 9, side: "right", offset: 3, size: 54, turn: 24, tone: "orange" },
  { top: 21, side: "left", offset: 2, size: 96, turn: -18, tone: "blue" },
  { top: 37, side: "right", offset: 6, size: 30, turn: -32, tone: "blue" },
  { top: 52, side: "left", offset: 5, size: 44, turn: 30, tone: "orange" },
  { top: 66, side: "right", offset: 1.5, size: 110, turn: 14, tone: "orange" },
  { top: 80, side: "left", offset: 1.5, size: 28, turn: -8, tone: "blue" },
  { top: 91, side: "right", offset: 8, size: 64, turn: -24, tone: "blue" },
];

/** Sits behind the page content (see layout.tsx); purely decorative. */
export default function PawBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PAWS.map((paw, i) => (
        <Paw
          key={i}
          className={`absolute ${paw.tone === "orange" ? "text-brand-orange/15" : "text-brand-blue/10"}`}
          style={{
            top: `${paw.top}%`,
            [paw.side]: `${paw.offset}%`,
            width: paw.size,
            height: paw.size,
            transform: `rotate(${paw.turn}deg)`,
          }}
        />
      ))}
    </div>
  );
}
