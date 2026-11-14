"use client";

import type { AnimalType } from "@prisma/client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductImage from "@/components/product-image";
import { useI18n } from "@/i18n/client";
import { formatPrice } from "@/lib/catalog";

type Suggestion = {
  id: string;
  name: string;
  slug: string;
  priceAmd: number;
  imageUrl: string;
  animalType: AnimalType;
};

/**
 * Header search. `expand` (desktop) is a round button that grows into a search field when
 * clicked; `inline` (phone menu) is always a full-width field. Both show matching products
 * in a dropdown while the visitor types.
 */
export default function SearchBox({ variant }: { variant: "expand" | "inline" }) {
  const router = useRouter();
  const { m } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(variant === "inline");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[] | null>(null);

  const term = query.trim();

  // Look up suggestions shortly after the visitor stops typing.
  useEffect(() => {
    if (term.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal });
        const data = (await res.json()) as { ok: boolean; products?: Suggestion[] };
        setResults(data.products ?? []);
      } catch {
        // A newer keystroke cancelled this request.
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  function close() {
    setResults(null);
    setQuery("");
    if (variant === "expand") setOpen(false);
  }

  // Click outside or Esc closes the field.
  useEffect(() => {
    if (!open) return;
    // The expanding field shrinks back and empties; the always-visible one only hides its list.
    function dismiss() {
      setResults(null);
      if (variant === "expand") {
        setOpen(false);
        setQuery("");
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) dismiss();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!term) return;
    router.push(`/shop?q=${encodeURIComponent(term)}`);
    close();
  }

  const showDropdown = open && term.length >= 2 && results !== null;
  const expand = variant === "expand";

  return (
    <div ref={rootRef} className={expand ? "relative h-10 w-10" : "relative"}>
      <form
        onSubmit={onSubmit}
        role="search"
        className={
          expand
            ? `absolute top-0 right-0 z-30 flex h-10 items-center overflow-hidden rounded-full transition-[width,background-color,box-shadow] duration-300 ${
                open ? "w-80 bg-white shadow-lg ring-2 ring-brand-blue" : "w-10 bg-transparent"
              }`
            : "flex h-11 items-center overflow-hidden rounded-full bg-white ring-2 ring-brand-blue/30 focus-within:ring-brand-blue"
        }
      >
        <input
          ref={inputRef}
          type="text"
          name="q"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={m.nav.searchPlaceholder}
          aria-label={m.nav.searchPlaceholder}
          tabIndex={open ? 0 : -1}
          className={`min-w-0 bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/40 ${
            open ? "flex-1 py-2 pl-4" : "pointer-events-none w-0 opacity-0"
          }`}
        />
        {open && query ? (
          <button
            type="button"
            aria-label="×"
            onClick={() => {
              setQuery("");
              setResults(null);
              inputRef.current?.focus();
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-brand-navy/50 hover:text-brand-navy"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type={open ? "submit" : "button"}
          aria-label={m.nav.search}
          title={m.nav.search}
          onClick={(event) => {
            if (!open) {
              event.preventDefault();
              setOpen(true);
              // Wait for the field to be shown before focusing it.
              requestAnimationFrame(() => inputRef.current?.focus());
            }
          }}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
            open ? "text-brand-blue" : "text-brand-navy hover:bg-white/70 hover:text-brand-orange"
          }`}
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {showDropdown ? (
        <div
          className={`absolute z-30 mt-2 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-brand-blue/10 ${
            expand ? "top-10 right-0 w-80" : "inset-x-0 top-11"
          }`}
        >
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-brand-navy/60">{m.nav.noResults}</p>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-2 transition hover:bg-brand-sky"
                  >
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                      <ProductImage imageUrl={product.imageUrl} name="" animalType={product.animalType} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-brand-navy">{product.name}</span>
                      <span className="block text-xs font-bold text-brand-orange">{formatPrice(product.priceAmd)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length > 0 ? (
            <Link
              href={`/shop?q=${encodeURIComponent(term)}`}
              onClick={close}
              className="block border-t border-brand-sky px-4 py-2.5 text-center text-sm font-bold text-brand-blue hover:bg-brand-sky"
            >
              {m.nav.seeAll}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
