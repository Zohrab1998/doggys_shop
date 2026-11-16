"use client";

import { useEffect, useState } from "react";

/**
 * The header's outer box. It sticks to the top of the screen; at the very top of the page it is
 * see-through, and once the visitor scrolls it gets a light background so it stays readable
 * over the content.
 */
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,box-shadow] duration-200 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}
