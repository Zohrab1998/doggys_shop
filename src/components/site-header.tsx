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
    <header className="border-b border-brand-blue/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={44} />
          <span className="leading-tight">
            <span className="block text-xl font-bold text-brand-navy">Doggy&apos;s Shop</span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-navy/50">
              Pet food and accessories
            </span>
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap gap-6 text-sm font-semibold text-brand-navy">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-orange">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center overflow-hidden rounded-full border border-brand-blue/20 bg-brand-sky sm:flex">
            <input
              type="search"
              placeholder="Search"
              className="w-48 bg-transparent px-4 py-2 text-sm outline-none"
              disabled
              title="Search is coming soon"
            />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white">
              🔍
            </span>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-brand-navy opacity-50"
            disabled
            title="Accounts are coming soon"
            aria-label="Account"
          >
            👤
          </button>
          <button
            type="button"
            className="relative rounded-full p-2 text-brand-navy opacity-50"
            disabled
            title="Cart is coming soon"
            aria-label="Cart"
          >
            🛒
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
