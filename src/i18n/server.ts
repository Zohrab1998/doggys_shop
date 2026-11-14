import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale, isLocale } from "./config";
import { en, type Messages } from "./en";
import { hy } from "./hy";
import { ru } from "./ru";

const MESSAGES: Record<Locale, Messages> = { en, hy, ru };

export function messagesFor(locale: Locale): Messages {
  return MESSAGES[locale];
}

/** The visitor's chosen language (from the `lang` cookie); English if they haven't chosen. */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** For Server Components and Route Handlers: `const { m } = await getI18n();` */
export async function getI18n(): Promise<{ locale: Locale; m: Messages }> {
  const locale = await getLocale();
  return { locale, m: MESSAGES[locale] };
}
