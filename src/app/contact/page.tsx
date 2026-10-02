import ContactForm from "./contact-form";

export const metadata = { title: "Contact Us — Doggy's Shop" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-3 text-slate-900/70">
        Questions about an order, a product, or want to say hi? Send us a message and we&apos;ll
        get back to you.
      </p>
      <ContactForm />
    </div>
  );
}
