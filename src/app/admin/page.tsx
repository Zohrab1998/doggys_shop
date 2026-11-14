import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/authz";
import { ANIMAL_TYPE_OPTIONS, formatPrice } from "@/lib/catalog";
import { ORDER_STATUS_LABEL } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import {
  formatShopDateTime,
  getMonthReport,
  getMonthlyTotals,
  monthKeyOf,
  monthLabel,
  parseMonthKey,
  shiftMonth,
} from "@/lib/reports";

export const dynamic = "force-dynamic";

/** Rounds up to a tidy axis maximum: 1, 2 or 5 times a power of ten. */
function niceMax(value: number): number {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 5, 10].find((n) => n * power >= value) ?? 10;
  return step * power;
}

function compact(amd: number): string {
  if (amd >= 1_000_000) return `${+(amd / 1_000_000).toFixed(1)}M`;
  if (amd >= 1_000) return `${+(amd / 1_000).toFixed(0)}K`;
  return String(amd);
}

function Change({ now, before, previousLabel }: { now: number; before: number; previousLabel: string }) {
  if (before === 0) {
    return <p className="mt-1 text-xs text-brand-navy/50">No sales in {previousLabel} to compare</p>;
  }
  const percent = Math.round(((now - before) / before) * 100);
  const arrow = percent > 0 ? "▲" : percent < 0 ? "▼" : "■";
  return (
    <p className="mt-1 text-xs text-brand-navy/60">
      <span className={percent > 0 ? "text-emerald-700" : percent < 0 ? "text-red-700" : ""}>
        {arrow} {Math.abs(percent)}%
      </span>{" "}
      vs {previousLabel}
    </p>
  );
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const user = await getSessionUser();
  if (!user || !user.isAdmin) {
    redirect("/signin?callbackUrl=/admin");
  }

  const currentMonth = monthKeyOf(new Date());
  const requested = parseMonthKey((await searchParams).month);
  // Future months have nothing to show.
  const month = requested && requested <= currentMonth ? requested : currentMonth;
  const previousMonth = shiftMonth(month, -1);

  const [report, previous, monthly, awaitingShipment, productCount] = await Promise.all([
    getMonthReport(month),
    getMonthReport(previousMonth),
    getMonthlyTotals(currentMonth, 12),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.product.count(),
  ]);

  const axisMax = niceMax(Math.max(...monthly.map((m) => m.revenueAmd)));
  const previousLabel = monthLabel(previousMonth, "short");
  const animalRows = [
    ...ANIMAL_TYPE_OPTIONS.map((animal) => ({ label: animal.label, amd: report.byAnimal.get(animal.value) ?? 0 })),
    ...(report.byAnimal.get("OTHER") ? [{ label: "Deleted products", amd: report.byAnimal.get("OTHER")! }] : []),
  ];
  const animalMax = Math.max(1, ...animalRows.map((row) => row.amd));

  const card = "rounded-2xl bg-white p-5 shadow-sm";
  const cardTitle = "text-sm font-extrabold tracking-wide text-brand-navy uppercase";

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-brand-navy">Sales dashboard</h1>
        <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
          <Link
            href={`/admin?month=${previousMonth}`}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-full text-brand-navy hover:bg-brand-sky"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span className="min-w-36 text-center font-extrabold text-brand-navy">{monthLabel(month)}</span>
          {month < currentMonth ? (
            <Link
              href={`/admin?month=${shiftMonth(month, 1)}`}
              aria-label="Next month"
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-navy hover:bg-brand-sky"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center text-brand-navy/25">
              <ChevronRight className="h-5 w-5" />
            </span>
          )}
        </div>
      </div>

      {awaitingShipment > 0 ? (
        <Link
          href="/admin/orders"
          className="block rounded-2xl bg-brand-orange px-5 py-3 font-bold text-white shadow-sm hover:bg-brand-orange-hover"
        >
          {awaitingShipment} paid {awaitingShipment === 1 ? "order is" : "orders are"} waiting to be shipped →
        </Link>
      ) : null}

      {/* ===== Headline numbers for the selected month ===== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className={card}>
          <p className="text-sm text-brand-navy/70">Revenue</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-navy">{formatPrice(report.revenueAmd)}</p>
          <Change now={report.revenueAmd} before={previous.revenueAmd} previousLabel={previousLabel} />
        </div>
        <div className={card}>
          <p className="text-sm text-brand-navy/70">Paid orders</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-navy">{report.orderCount}</p>
          <Change now={report.orderCount} before={previous.orderCount} previousLabel={previousLabel} />
        </div>
        <div className={card}>
          <p className="text-sm text-brand-navy/70">Average order</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-navy">{formatPrice(report.averageOrderAmd)}</p>
          <Change now={report.averageOrderAmd} before={previous.averageOrderAmd} previousLabel={previousLabel} />
        </div>
        <div className={card}>
          <p className="text-sm text-brand-navy/70">Items sold</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-navy">{report.itemsSold}</p>
          <p className="mt-1 text-xs text-brand-navy/50">{productCount} products in the shop</p>
        </div>
      </div>

      {/* ===== Revenue per month ===== */}
      <section className={card} aria-label="Revenue per month, last 12 months">
        <h2 className={cardTitle}>Revenue per month</h2>
        <p className="text-sm text-brand-navy/60">Last 12 months, in AMD. Click a bar to open that month.</p>

        <div className="mt-6 flex gap-3">
          <div className="flex h-56 flex-col justify-between text-right text-xs text-brand-navy/50">
            <span>{compact(axisMax)}</span>
            <span>{compact(axisMax / 2)}</span>
            <span>0</span>
          </div>
          <div className="relative flex-1">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex h-56 flex-col justify-between">
              <span className="border-t border-brand-navy/10" />
              <span className="border-t border-brand-navy/10" />
              <span className="border-t border-brand-navy/25" />
            </div>
            <div className="relative flex gap-1 sm:gap-2">
              {monthly.map((m) => {
                const selected = m.month === month;
                const height = (m.revenueAmd / axisMax) * 100;
                return (
                  <Link
                    key={m.month}
                    href={`/admin?month=${m.month}`}
                    aria-current={selected ? "true" : undefined}
                    aria-label={`${monthLabel(m.month)}: ${formatPrice(m.revenueAmd)}, ${m.orders} orders`}
                    className="group relative flex-1 outline-none"
                  >
                    <div className="flex h-56 items-end justify-center rounded-t-md group-hover:bg-brand-sky/70 group-focus-visible:bg-brand-sky/70">
                      <div
                        className={`w-full max-w-10 rounded-t ${selected ? "bg-brand-blue" : "bg-brand-blue/45"}`}
                        style={{ height: `${height}%`, minHeight: m.revenueAmd > 0 ? 3 : 0 }}
                      />
                    </div>
                    <p className={`mt-2 text-center text-xs ${selected ? "font-extrabold text-brand-navy" : "text-brand-navy/60"}`}>
                      {monthLabel(m.month, "short")}
                    </p>
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 rounded-lg bg-brand-navy px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg group-hover:block group-focus-visible:block">
                      <p className="font-bold">{monthLabel(m.month)}</p>
                      <p>{formatPrice(m.revenueAmd)}</p>
                      <p className="text-white/70">
                        {m.orders} {m.orders === 1 ? "order" : "orders"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===== Best sellers ===== */}
        <section className={card}>
          <h2 className={cardTitle}>Best sellers in {monthLabel(month)}</h2>
          {report.topProducts.length === 0 ? (
            <p className="mt-4 text-sm text-brand-navy/60">No sales this month.</p>
          ) : (
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-brand-navy/50">
                  <th className="py-1 font-semibold">Product</th>
                  <th className="py-1 text-right font-semibold">Sold</th>
                  <th className="py-1 text-right font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sky">
                {report.topProducts.map((product) => (
                  <tr key={product.name}>
                    <td className="py-2 pr-3 text-brand-navy">{product.name}</td>
                    <td className="py-2 text-right text-brand-navy tabular-nums">{product.quantity}</td>
                    <td className="py-2 text-right font-bold whitespace-nowrap text-brand-navy tabular-nums">
                      {formatPrice(product.revenueAmd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* ===== Sales by animal ===== */}
        <section className={card}>
          <h2 className={cardTitle}>Sales by animal in {monthLabel(month)}</h2>
          <p className="text-sm text-brand-navy/60">Product sales, without delivery fees.</p>
          <div className="mt-4 space-y-3">
            {animalRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[6.5rem_1fr_7rem] items-center gap-3 text-sm">
                <span className="text-brand-navy">{row.label}</span>
                <div className="h-4">
                  <div
                    className="h-full rounded-r bg-brand-blue"
                    style={{ width: `${(row.amd / animalMax) * 100}%`, minWidth: row.amd > 0 ? 3 : 0 }}
                  />
                </div>
                <span className="text-right font-bold text-brand-navy tabular-nums">{formatPrice(row.amd)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== Every transaction of the month ===== */}
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className={cardTitle}>Transactions in {monthLabel(month)}</h2>
            <p className="text-sm text-brand-navy/60">
              {report.orderCount} paid {report.orderCount === 1 ? "order" : "orders"} · {formatPrice(report.revenueAmd)}
            </p>
          </div>
          {report.orderCount > 0 ? (
            <a
              href={`/api/admin/reports/${month}`}
              className="flex items-center gap-2 rounded-full border-2 border-brand-blue px-4 py-1.5 text-sm font-bold text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download for Excel
            </a>
          ) : null}
        </div>

        {report.transactions.length === 0 ? (
          <p className="mt-4 text-sm text-brand-navy/60">No paid orders this month.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-brand-sky text-left text-xs text-brand-navy/50">
                  <th className="py-2 pr-3 font-semibold">Paid</th>
                  <th className="py-2 pr-3 font-semibold">Order</th>
                  <th className="py-2 pr-3 font-semibold">Customer</th>
                  <th className="py-2 pr-3 font-semibold">Items</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                  <th className="py-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sky">
                {report.transactions.map((t) => (
                  <tr key={t.id} className="align-top">
                    <td className="py-2 pr-3 whitespace-nowrap text-brand-navy/80">{formatShopDateTime(t.paidAt)}</td>
                    <td className="py-2 pr-3 font-mono text-xs text-brand-navy/80">#{t.id.slice(0, 8)}</td>
                    <td className="py-2 pr-3 text-brand-navy">
                      {t.customer}
                      {t.isGuest ? <span className="text-brand-navy/50"> (guest)</span> : null}
                    </td>
                    <td className="py-2 pr-3 text-brand-navy/80">{t.items.join(", ")}</td>
                    <td className="py-2 pr-3 whitespace-nowrap text-brand-navy/80">
                      {ORDER_STATUS_LABEL[t.status] ?? t.status}
                    </td>
                    <td className="py-2 text-right font-bold whitespace-nowrap text-brand-navy tabular-nums">
                      {formatPrice(t.totalAmd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
