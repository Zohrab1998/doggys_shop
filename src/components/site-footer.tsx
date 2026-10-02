import Link from "next/link";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.3c0-.87.24-1.46 1.5-1.46H16.6V4.14C16.3 4.1 15.3 4 14.1 4c-2.4 0-4.1 1.47-4.1 4.17v2.33H7.5v3H10V21h3.5Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.5 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 bg-slate-900 text-sky-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">Doggy&apos;s Shop</p>
          <p className="mt-2 text-sm text-sky-100/70">
            Curated supplies, nutrition, and care for dogs, cats, birds, and hamsters.
          </p>
          <p className="mt-2 text-sm text-sky-100/70">Delivery within Yerevan, Armenia.</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-sky-100/80">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="transition hover:text-orange-400">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-orange-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-orange-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-sky-100/80">Follow Us</p>
          <div className="mt-3 flex gap-4">
            <span className="rounded-full bg-white/10 p-2 transition hover:bg-orange-500" title="Instagram">
              <InstagramIcon />
            </span>
            <span className="rounded-full bg-white/10 p-2 transition hover:bg-orange-500" title="Facebook">
              <FacebookIcon />
            </span>
            <span className="rounded-full bg-white/10 p-2 transition hover:bg-orange-500" title="Twitter">
              <TwitterIcon />
            </span>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-sky-100/50">
        © {new Date().getFullYear()} Doggy&apos;s Shop. All rights reserved.
      </p>
    </footer>
  );
}
