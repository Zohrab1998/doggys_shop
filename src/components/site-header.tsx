import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-brand-blue/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-brand-navy">Doggy&apos;s Shop</span>
        </Link>

        <nav className="ml-6 flex flex-1 flex-wrap gap-6 text-sm font-medium text-brand-navy">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-orange">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search products…"
            className="hidden w-56 rounded-full border border-brand-blue/20 bg-brand-sky px-4 py-2 text-sm outline-none focus:border-brand-blue sm:block"
            disabled
            title="Search is coming soon"
          />
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
            className="rounded-full p-2 text-brand-navy opacity-50"
            disabled
            title="Cart is coming soon"
            aria-label="Cart"
          >
            🛒
          </button>
        </div>
      </div>
    </header>
  );
}
