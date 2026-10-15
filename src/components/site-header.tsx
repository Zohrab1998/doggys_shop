import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteHeader() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-sm font-extrabold tracking-wide text-brand-navy uppercase">
          Doggy&apos;s Shop
        </Link>
        <nav className="flex flex-wrap gap-6 text-sm font-bold tracking-wider text-brand-navy uppercase sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-orange">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
