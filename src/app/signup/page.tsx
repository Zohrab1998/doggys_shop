import { Suspense } from "react";
import SignUpForm from "./signup-form";

export const metadata = { title: "Sign Up — Doggy's Shop" };

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy">Create your account</h1>
      <p className="mt-2 text-brand-navy/70">Sign up to track orders and check out faster.</p>
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
