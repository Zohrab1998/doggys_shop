import type { AnimalType } from "@prisma/client";

/**
 * Hand-drawn SVG mascots, one per animal type. Used in the hero tiles, the shop banner and
 * as the placeholder artwork for products that don't have a photo yet.
 */

const INK = "#3b2a20";

function Dog() {
  return (
    <>
      {/* body + collar */}
      <path d="M48 200c0-40 22-62 52-62s52 22 52 62z" fill="#e9a455" />
      <path d="M78 200c0-26 9-40 22-40s22 14 22 40z" fill="#fbe3c0" />
      <path d="M64 148c12 10 60 10 72 0l3 12c-16 12-62 12-78 0z" fill="#005a98" />
      <circle cx="100" cy="166" r="8" fill="#ffd34d" stroke="#d9a400" strokeWidth="2" />
      {/* ears */}
      <ellipse cx="46" cy="96" rx="22" ry="44" transform="rotate(16 46 96)" fill="#a8632a" />
      <ellipse cx="154" cy="96" rx="22" ry="44" transform="rotate(-16 154 96)" fill="#a8632a" />
      {/* head */}
      <ellipse cx="100" cy="92" rx="58" ry="56" fill="#e9a455" />
      <path d="M100 38c10 14 10 34 0 52c-10-18-10-38 0-52z" fill="#f6c88a" />
      <ellipse cx="100" cy="120" rx="34" ry="27" fill="#fbe3c0" />
      {/* tongue + mouth */}
      <path d="M90 128h20v8a10 10 0 0 1-20 0z" fill="#f2748c" />
      <path d="M100 114v10m0 0c-6 9-16 9-21 2m21-2c6 9 16 9 21 2" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="100" cy="107" rx="12" ry="8.5" fill={INK} />
      <ellipse cx="96" cy="104.5" rx="3.5" ry="2" fill="#fff" opacity=".6" />
      {/* eyes */}
      <circle cx="77" cy="86" r="7.5" fill={INK} />
      <circle cx="123" cy="86" r="7.5" fill={INK} />
      <circle cx="79.5" cy="83.5" r="2.5" fill="#fff" />
      <circle cx="125.5" cy="83.5" r="2.5" fill="#fff" />
      <path d="M66 72q10-7 20-2M114 70q10-5 20 2" fill="none" stroke="#a8632a" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Cat() {
  return (
    <>
      {/* tail + body */}
      <path d="M150 190c26-6 30-40 12-52" fill="none" stroke="#8088a0" strokeWidth="14" strokeLinecap="round" />
      <path d="M50 200c0-40 22-60 50-60s50 20 50 60z" fill="#9aa1b8" />
      <path d="M80 200c0-24 8-36 20-36s20 12 20 36z" fill="#f4f5fa" />
      {/* ears */}
      <path d="M46 70L54 14l42 34z" fill="#9aa1b8" />
      <path d="M154 70l-8-56-42 34z" fill="#9aa1b8" />
      <path d="M56 56l4-26 20 17z" fill="#f7a8bc" />
      <path d="M144 56l-4-26-20 17z" fill="#f7a8bc" />
      {/* head */}
      <ellipse cx="100" cy="98" rx="62" ry="52" fill="#9aa1b8" />
      <path d="M100 48v18M84 50l3 15M116 50l-3 15" stroke="#6c7389" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 92l14 4M40 106l14-1M160 92l-14 4M160 106l-14-1" stroke="#6c7389" strokeWidth="4" strokeLinecap="round" />
      <circle cx="86" cy="120" r="17" fill="#f4f5fa" />
      <circle cx="114" cy="120" r="17" fill="#f4f5fa" />
      <path d="M93 108h14l-7 9z" fill="#f2748c" />
      <path d="M100 117v6m0 0c-4 6-10 6-13 2m13-2c4 6 10 6 13 2" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M72 118l-30-6M72 124l-30 4M128 118l30-6M128 124l30 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx="75" cy="92" rx="10" ry="12" fill="#b9e36a" />
      <ellipse cx="125" cy="92" rx="10" ry="12" fill="#b9e36a" />
      <ellipse cx="75" cy="92" rx="3.5" ry="10" fill={INK} />
      <ellipse cx="125" cy="92" rx="3.5" ry="10" fill={INK} />
      <circle cx="78" cy="87" r="2.5" fill="#fff" />
      <circle cx="128" cy="87" r="2.5" fill="#fff" />
    </>
  );
}

function Bird() {
  return (
    <>
      {/* tail */}
      <path d="M88 178l-10 22h44l-10-22z" fill="#1c7fd1" />
      {/* wings */}
      <ellipse className="animal-wing animal-wing-left" cx="50" cy="136" rx="20" ry="40" transform="rotate(14 50 136)" fill="#178a5c" />
      <ellipse className="animal-wing animal-wing-right" cx="150" cy="136" rx="20" ry="40" transform="rotate(-14 150 136)" fill="#178a5c" />
      {/* body */}
      <ellipse cx="100" cy="138" rx="46" ry="52" fill="#2fb57a" />
      <ellipse cx="100" cy="150" rx="28" ry="36" fill="#ffd95a" />
      <path d="M86 140q14 8 28 0M88 156q12 7 24 0" fill="none" stroke="#f2b632" strokeWidth="3" strokeLinecap="round" />
      {/* crest */}
      <path d="M100 34c-8-16-2-26 6-30c-2 10 2 16 4 26z" fill="#ef4b4b" />
      <path d="M88 38c-12-10-12-22-6-28c2 10 8 14 14 22z" fill="#ffb02e" />
      <path d="M112 38c12-10 14-20 10-28c-4 8-10 12-16 22z" fill="#ffb02e" />
      {/* head */}
      <circle cx="100" cy="72" r="42" fill="#2fb57a" />
      <circle cx="78" cy="70" r="14" fill="#fff" />
      <circle cx="122" cy="70" r="14" fill="#fff" />
      <circle cx="80" cy="70" r="7" fill={INK} />
      <circle cx="120" cy="70" r="7" fill={INK} />
      <circle cx="82.5" cy="67.5" r="2.5" fill="#fff" />
      <circle cx="122.5" cy="67.5" r="2.5" fill="#fff" />
      {/* beak */}
      <path d="M86 84c0-12 28-12 28 0c0 14-6 26-14 26s-14-12-14-26z" fill="#ffb02e" />
      <path d="M90 96c4 4 16 4 20 0c-2 8-6 14-10 14s-8-6-10-14z" fill="#e58a00" />
      {/* feet */}
      <path d="M84 190v8m-6 0h12M116 190v8m-6 0h12" stroke="#e58a00" strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

function Hamster() {
  return (
    <>
      {/* ears */}
      <circle cx="58" cy="50" r="18" fill="#d9954a" />
      <circle cx="142" cy="50" r="18" fill="#d9954a" />
      <circle cx="58" cy="52" r="10" fill="#f7a8bc" />
      <circle cx="142" cy="52" r="10" fill="#f7a8bc" />
      {/* body */}
      <ellipse cx="100" cy="116" rx="74" ry="76" fill="#eab366" />
      <path d="M100 42c16 10 22 26 20 40h-40c-2-14 4-30 20-40z" fill="#d9954a" opacity=".55" />
      <ellipse cx="100" cy="136" rx="56" ry="52" fill="#fff6e8" />
      {/* cheeks */}
      <circle cx="56" cy="118" r="12" fill="#f7a8bc" opacity=".6" />
      <circle cx="144" cy="118" r="12" fill="#f7a8bc" opacity=".6" />
      {/* face */}
      <circle cx="76" cy="94" r="8" fill={INK} />
      <circle cx="124" cy="94" r="8" fill={INK} />
      <circle cx="78.5" cy="91" r="3" fill="#fff" />
      <circle cx="126.5" cy="91" r="3" fill="#fff" />
      <ellipse cx="100" cy="108" rx="7" ry="5" fill="#f2748c" />
      <path d="M100 113v5m0 0c-4 5-9 5-12 1m12-1c4 5 9 5 12 1" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M95 119h10v9h-10z" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <path d="M100 119v9" stroke={INK} strokeWidth="1.2" />
      {/* seed + paws */}
      <path d="M100 138c9 8 9 24 0 32c-9-8-9-24 0-32z" fill="#4a3a2c" />
      <path d="M100 142v24" stroke="#f1e2c6" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="82" cy="156" rx="12" ry="9" fill="#eab366" />
      <ellipse cx="118" cy="156" rx="12" ry="9" fill="#eab366" />
      {/* feet */}
      <ellipse cx="72" cy="190" rx="16" ry="7" fill="#f7a8bc" />
      <ellipse cx="128" cy="190" rx="16" ry="7" fill="#f7a8bc" />
    </>
  );
}

const ART: Record<AnimalType, () => React.ReactElement> = {
  DOG: Dog,
  CAT: Cat,
  BIRD: Bird,
  HAMSTER: Hamster,
};

export default function AnimalArt({
  animal,
  className,
  title,
}: {
  animal: AnimalType;
  className?: string;
  title?: string;
}) {
  const Art = ART[animal];
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Art />
    </svg>
  );
}
