export const LOCALES = ["en", "hy", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

/** The site opens in English until the visitor picks another language. */
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

/** How each language is shown in the language switcher. */
export const LOCALE_NAMES: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  hy: { short: "ՀԱՅ", full: "Հայերեն" },
  ru: { short: "РУ", full: "Русский" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return (LOCALES as readonly string[]).includes(value ?? "");
}

/** Fills `{placeholders}` in a translated sentence: fmt("From {min}", { min: "10,000 AMD" }). */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
