"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Bandana photo used as page decoration: two on the homepage (left and right edge), one on
 * every other page (left edge). Shown only on wide screens, where there is free space beside
 * the content.
 *
 * Switched off until the shop has its own bandana photo: put a cut-out photo (transparent
 * background, about 360px tall) at public/decor/bandana.webp and fill in BANDANA below.
 */
const BANDANA: { src: string; width: number; height: number } | null = null;
// e.g. { src: "/decor/bandana.webp", width: 251, height: 360 }

function Bandana({ className }: { className: string }) {
  if (!BANDANA) return null;
  return (
    <Image
      src={BANDANA.src}
      alt=""
      width={BANDANA.width}
      height={BANDANA.height}
      sizes="190px"
      className={`absolute hidden w-[190px] drop-shadow-[0_12px_16px_rgba(11,68,112,0.28)] min-[1520px]:block ${className}`}
    />
  );
}

export default function PageBandanas() {
  const isHome = usePathname() === "/";
  // The clipping box stops a bandana at the page edge from making the page scroll sideways.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {isHome ? (
        <>
          <Bandana className="top-[640px] -left-[46px] -rotate-[28deg] min-[1800px]:left-8" />
          <Bandana className="top-[1180px] -right-[46px] rotate-[24deg] min-[1800px]:right-8" />
        </>
      ) : (
        <Bandana className="top-[420px] -left-[46px] -rotate-[28deg] min-[1800px]:left-8" />
      )}
    </div>
  );
}
