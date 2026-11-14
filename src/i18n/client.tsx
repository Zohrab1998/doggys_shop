"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Messages } from "./en";

type I18n = { locale: Locale; m: Messages };

const I18nContext = createContext<I18n | null>(null);

/** Wraps the app (see layout.tsx) so Client Components can read the current language. */
export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale, m: messages }}>{children}</I18nContext.Provider>;
}

/** For Client Components: `const { m } = useI18n();` */
export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
