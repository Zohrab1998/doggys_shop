import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-brand-blue/10 bg-brand-navy text-brand-sky">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Doggy&apos;s Shop</p>
          <p className="mt-2 text-sm text-brand-sky/70">
            Curated supplies, nutrition, and care for dogs, cats, birds, and hamsters.
          </p>
          <p className="mt-2 text-sm text-brand-sky/70">Delivery within Yerevan, Armenia.</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-sky/80">
            Quick links
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-brand-orange">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-orange">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-orange">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-sky/80">
            Follow us
          </p>
          <div className="mt-3 flex gap-4 text-xl">
            <span title="Instagram">📷</span>
            <span title="Facebook">📘</span>
            <span title="Twitter">🐦</span>
          </div>
        </div>
      </div>
      <p className="border-t border-brand-sky/10 py-4 text-center text-xs text-brand-sky/60">
        © {new Date().getFullYear()} Doggy&apos;s Shop. All rights reserved.
      </p>
    </footer>
  );
}
