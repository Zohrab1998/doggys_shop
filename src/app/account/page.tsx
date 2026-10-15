import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/authz";

export const metadata = { title: "Your Account — Doggy's Shop" };

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin?callbackUrl=/account");
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-14">
      <h1 className="text-3xl font-bold text-brand-navy">Your Account</h1>
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <p className="font-bold text-brand-navy">{user.name ?? "—"}</p>
        <p className="text-sm text-brand-navy/60">{user.email}</p>
      </div>
      <Link
        href="/orders"
        className="mt-4 inline-block rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-orange-hover"
      >
        View order history
      </Link>
    </div>
  );
}
