import { Suspense } from "react";
import { getI18n } from "@/i18n/server";
import SignUpForm from "./signup-form";

export const metadata = { title: "Sign Up — Doggy's Shop" };

export default async function SignUpPage() {
  const { m } = await getI18n();
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy">{m.auth.signUpTitle}</h1>
      <p className="mt-2 text-brand-navy/70">{m.auth.signUpIntro}</p>
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
