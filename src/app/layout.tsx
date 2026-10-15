import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import AuthSessionProvider from "@/components/auth-session-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doggy's Shop — Your Pet's Happy Place",
  description:
    "Curated supplies, nutrition, and care for dogs, cats, birds, and hamsters. Delivery within Yerevan, Armenia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-sky-light font-sans text-brand-navy">
        <AuthSessionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
