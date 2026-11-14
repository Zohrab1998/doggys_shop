"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { locale, m } = useI18n();
  const [pending, setPending] = useState<Locale | null>(null);

  async function choose(next: Locale) {
    if (next === locale) return;
    setPending(next);
    try {
      await fetch("/api/lang", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  return (
    <div role="group" aria-label={m.nav.language} className={`flex items-center rounded-full bg-brand-sky p-0.5 ${className}`}>
      {LOCALES.map((code) => {
        const active = code === (pending ?? locale);
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={LOCALE_NAMES[code].full}
            aria-label={LOCALE_NAMES[code].full}
            aria-pressed={active}
            onClick={() => void choose(code)}
            className={`rounded-full px-2.5 py-1 text-xs font-extrabold transition ${
              active ? "bg-brand-blue text-white" : "text-brand-navy hover:bg-white"
            }`}
          >
            {LOCALE_NAMES[code].short}
          </button>
        );
      })}
    </div>
  );
}
