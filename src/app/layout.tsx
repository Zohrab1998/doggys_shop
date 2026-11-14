import type { Metadata } from "next";
import { Noto_Sans_Armenian, Nunito } from "next/font/google";
import AuthSessionProvider from "@/components/auth-session-provider";
import FreeDeliveryBar from "@/components/free-delivery-bar";
import PawBackdrop from "@/components/paw-backdrop";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { I18nProvider } from "@/i18n/client";
import { getI18n } from "@/i18n/server";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
});

// Nunito has no Armenian letters, so Armenian text falls back to this font.
const armenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { m } = await getI18n();
  return { title: m.home.metaTitle, description: m.home.metaDescription };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, m } = await getI18n();

  return (
    <html lang={locale} className={`${nunito.variable} ${armenian.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-sky font-sans text-brand-navy">
        <I18nProvider locale={locale} messages={m}>
          <AuthSessionProvider>
            <FreeDeliveryBar />
            {/* The header is see-through and floats over the top of the page, so `main` starts
                underneath it and leaves room with top padding (the homepage hero pulls itself
                back up under the header). */}
            <div className="relative flex flex-1 flex-col">
              <PawBackdrop />
              <SiteHeader />
              <main className="relative flex-1 pt-24">{children}</main>
            </div>
            <SiteFooter />
          </AuthSessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
