"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/i18n/client";

export default function ContactForm() {
  const { m } = useI18n();
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
      if (!res.ok || !data.ok) throw new Error(data.message ?? m.contact.failed);
      setStatus(data.message ?? m.contact.thanks);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : m.contact.failed);
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-sky-500/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-900/60">{m.contact.name}</label>
        <input required className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-900/60">{m.contact.email}</label>
        <input
          required
          type="email"
          className={fieldClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-900/60">{m.contact.message}</label>
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
        className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? m.contact.sending : m.contact.send}
      </button>
      {status ? <p className="text-sm text-slate-900/80">{status}</p> : null}
    </form>
  );
}
