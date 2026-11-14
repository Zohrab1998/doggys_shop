import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/authz";

export const metadata = { title: "Admin — Doggy's Shop" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || !user.isAdmin) {
    redirect("/signin?callbackUrl=/admin");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-navy px-5 py-3 text-white">
        <p className="font-extrabold tracking-wide uppercase">Shop admin</p>
        <nav className="flex gap-2 text-sm font-bold">
          <Link href="/admin/products" className="rounded-full bg-white/15 px-4 py-1.5 hover:bg-white/30">
            Products
          </Link>
          <Link href="/admin/orders" className="rounded-full bg-white/15 px-4 py-1.5 hover:bg-white/30">
            Orders
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
