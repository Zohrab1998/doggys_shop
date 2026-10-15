import { Suspense } from "react";
import SignInForm from "./signin-form";

export const metadata = { title: "Sign In — Doggy's Shop" };

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy">Sign in</h1>
      <p className="mt-2 text-brand-navy/70">Welcome back! Sign in to continue.</p>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
