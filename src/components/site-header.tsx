import { Menu, Search } from "lucide-react";
import Link from "next/link";
import AccountCartMenu from "@/components/account-cart-menu";
import Logo from "@/components/logo";
import { ANIMAL_TYPE_OPTIONS } from "@/lib/catalog";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  ...ANIMAL_TYPE_OPTIONS.map((a) => ({ href: `/shop?animalType=${a.value}`, label: a.label })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/shop" role="search" className={`relative ${className}`}>
      <input
        type="search"
        name="q"
        placeholder="Search products"
        aria-label="Search products"
        className="w-full rounded-full border-2 border-brand-blue/30 bg-white py-2 pr-10 pl-4 text-sm text-brand-navy outline-none placeholder:text-brand-navy/40 focus:border-brand-blue"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue text-white"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}

export default function SiteHeader() {
  return (
    <header className="relative z-20 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo size={52} />
          <span className="hidden text-lg leading-none font-extrabold text-brand-blue sm:block">
            Doggy&apos;s
            <br />
            <span className="text-brand-orange">Shop</span>
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center gap-5 text-sm font-bold tracking-wide text-brand-navy uppercase lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-orange">
              {link.label}
            </Link>
          ))}
        </nav>

        <SearchForm className="hidden w-52 md:block lg:w-44 xl:w-56" />

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <AccountCartMenu />

          {/* Mobile menu — <details> so it works without any client-side JavaScript. */}
          <details className="group lg:hidden">
            <summary
              aria-label="Menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-brand-navy hover:bg-brand-sky [&::-webkit-details-marker]:hidden"
            >
              <Menu className="h-6 w-6" />
            </summary>
            <div className="absolute inset-x-0 top-full border-t border-brand-sky bg-white px-6 py-4 shadow-lg">
              <SearchForm className="mb-4 md:hidden" />
              <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-bold tracking-wide text-brand-navy uppercase">
                {NAV_LINKS.map((link) => (
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
