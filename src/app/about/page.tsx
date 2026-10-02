export const metadata = { title: "About Us — Doggy's Shop" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy">About Us</h1>
      <p className="mt-4 text-brand-navy/80">
        Doggy&apos;s Shop is a Yerevan-based online pet store bringing together curated supplies,
        nutrition, and expert care for dogs, cats, birds, and hamsters. We believe every pet
        deserves a happy, healthy home — and every pet parent deserves a simple place to find
        everything they need.
      </p>
      <p className="mt-4 text-brand-navy/80">
        We&apos;re just getting started: today you can browse our full catalogue by animal type,
        category, brand, and price. Soon we&apos;ll be adding grooming appointment booking and
        fast delivery across Yerevan.
      </p>
    </div>
  );
}
