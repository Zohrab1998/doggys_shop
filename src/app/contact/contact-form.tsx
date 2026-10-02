"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Something went wrong.");
      setStatus(data.message ?? "Thanks! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-brand-blue/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-blue";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-navy/60">Name</label>
        <input required className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-navy/60">Email</label>
        <input
          required
          type="email"
          className={fieldClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-navy/60">Message</label>
        <textarea
          required
          rows={5}
          className={fieldClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
      {status ? <p className="text-sm text-brand-navy/80">{status}</p> : null}
    </form>
  );
}
