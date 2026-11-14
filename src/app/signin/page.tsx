import { Suspense } from "react";
import { getI18n } from "@/i18n/server";
import SignInForm from "./signin-form";

export const metadata = { title: "Sign In — Doggy's Shop" };

export default async function SignInPage() {
  const { m } = await getI18n();
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy">{m.auth.signInTitle}</h1>
      <p className="mt-2 text-brand-navy/70">{m.auth.signInIntro}</p>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
