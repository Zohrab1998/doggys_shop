import { getI18n } from "@/i18n/server";
import ContactForm from "./contact-form";

export const metadata = { title: "Contact Us — Doggy's Shop" };

export default async function ContactPage() {
  const { m } = await getI18n();
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-brand-navy">{m.contact.title}</h1>
      <p className="mt-3 text-brand-navy/70">{m.contact.intro}</p>
      <ContactForm />
    </div>
  );
}
