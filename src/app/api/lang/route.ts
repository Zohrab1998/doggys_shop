import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE, isLocale } from "@/i18n/config";

/** Remembers the language the visitor picked in the header switcher. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { locale?: string } | null;
  if (!isLocale(body?.locale)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  (await cookies()).set(LOCALE_COOKIE, body.locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return NextResponse.json({ ok: true });
}
