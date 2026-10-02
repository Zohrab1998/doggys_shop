import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-slate-900/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={44} />
          <span className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight text-slate-900">
              Doggy&apos;s Shop
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-sky-600">
              Pet food and accessories
            </span>
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-bold tracking-wide text-slate-800">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 uppercase after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all hover:text-orange-600 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="hidden items-center overflow-hidden rounded-full border border-slate-900/10 bg-sky-50 sm:flex">
            <span className="sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search"
              disabled
              title="Search is coming soon"
              className="w-40 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-slate-400 lg:w-56"
            />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white">
              <Search className="h-4 w-4" />
            </span>
          </label>
          <button
            type="button"
            disabled
            title="Accounts are coming soon"
            aria-label="Account"
            className="rounded-full p-2 text-slate-700 opacity-60"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            type="button"
            disabled
            title="Cart is coming soon"
            aria-label="Cart"
            className="relative rounded-full p-2 text-slate-700 opacity-60"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
