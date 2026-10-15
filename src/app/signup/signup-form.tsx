"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Could not create account.");

      const signInResult = await signIn("credentials", { email, password, redirect: false });
      if (signInResult?.error) {
        setMessage("Account created — please sign in.");
        return;
      }
      window.location.href = callbackUrl;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-sky-500/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500";

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white py-2.5 text-sm font-bold text-brand-navy transition hover:bg-brand-sky-light"
      >
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs font-semibold text-brand-navy/40 uppercase">
        <span className="h-px flex-1 bg-brand-navy/10" /> or <span className="h-px flex-1 bg-brand-navy/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold tracking-wider text-brand-navy/60 uppercase">Name</label>
          <input required className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider text-brand-navy/60 uppercase">Email</label>
          <input
            required
            type="email"
            className={fieldClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider text-brand-navy/60 uppercase">Password</label>
          <input
            required
            type="password"
            minLength={8}
            className={fieldClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-orange py-2.5 text-sm font-bold text-white transition hover:bg-brand-orange-hover disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
        {message ? <p className="text-sm text-brand-navy/80">{message}</p> : null}
      </form>

      <p className="mt-4 text-sm text-brand-navy/60">
        Already have an account?{" "}
        <a href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-brand-orange hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
