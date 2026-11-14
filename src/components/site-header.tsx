import { Menu } from "lucide-react";
import Link from "next/link";
import AccountCartMenu from "@/components/account-cart-menu";
import LanguageSwitcher from "@/components/language-switcher";
import Logo from "@/components/logo";
import SearchBox from "@/components/search-box";
import { getI18n } from "@/i18n/server";
import { ANIMAL_TYPE_OPTIONS } from "@/lib/catalog";

export default async function SiteHeader() {
  const { m } = await getI18n();
  const navLinks = [
    { href: "/shop", label: m.nav.shop },
    ...ANIMAL_TYPE_OPTIONS.map((a) => ({ href: `/shop?animalType=${a.value}`, label: m.animals[a.value].label })),
    { href: "/about", label: m.nav.about },
    { href: "/contact", label: m.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-24 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo size={76} />
          <span className="hidden text-xl leading-none font-extrabold text-brand-blue sm:block">
            Doggy&apos;s
            <br />
            <span className="text-brand-orange">Shop</span>
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center gap-4 text-xs font-bold tracking-wide whitespace-nowrap text-brand-navy uppercase lg:flex xl:gap-7 xl:text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-orange">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <div className="hidden md:block">
            <SearchBox variant="expand" />
          </div>
          <LanguageSwitcher className="mx-1 hidden sm:flex" />
          <AccountCartMenu />

          {/* Mobile menu — <details> so it works without any client-side JavaScript. */}
          <details className="group lg:hidden">
            <summary
              aria-label={m.nav.menu}
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-brand-navy hover:bg-white/70 [&::-webkit-details-marker]:hidden"
            >
              <Menu className="h-6 w-6" />
            </summary>
            <div className="absolute inset-x-0 top-full border-t border-brand-sky bg-white px-6 py-4 shadow-lg">
              <LanguageSwitcher className="mb-4 w-fit sm:hidden" />
              <div className="mb-4 md:hidden">
                <SearchBox variant="inline" />
              </div>
              <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-bold tracking-wide text-brand-navy uppercase">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="py-1 hover:text-brand-orange">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
