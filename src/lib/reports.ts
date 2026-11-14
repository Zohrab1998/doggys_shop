import type { AnimalType } from "@prisma/client";
import { PAID_STATUSES } from "@/lib/orders";
import { prisma } from "@/lib/prisma";

/**
 * Sales reports for the admin dashboard.
 *
 * A "sale" is an order that has been paid (status Paid, Shipped or Delivered), counted in the
 * month it was paid. Months follow Yerevan time (UTC+4, no daylight saving).
 */
const SHOP_UTC_OFFSET_HOURS = 4;
const MONTH_KEY = /^(\d{4})-(0[1-9]|1[0-2])$/;

export type MonthKey = string; // "2026-11"

function monthStart(year: number, monthIndex: number): Date {
  return new Date(Date.UTC(year, monthIndex, 1) - SHOP_UTC_OFFSET_HOURS * 3_600_000);
}

export function monthKeyOf(date: Date): MonthKey {
  const local = new Date(date.getTime() + SHOP_UTC_OFFSET_HOURS * 3_600_000);
  return `${local.getUTCFullYear()}-${String(local.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function parseMonthKey(value: string | undefined): MonthKey | null {
  return value && MONTH_KEY.test(value) ? value : null;
}

export function shiftMonth(key: MonthKey, by: number): MonthKey {
  const [year, month] = key.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1 + by, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthRange(key: MonthKey): { from: Date; to: Date } {
  const [year, month] = key.split("-").map(Number);
  return { from: monthStart(year, month - 1), to: monthStart(year, month) };
}

export function monthLabel(key: MonthKey, style: "long" | "short" = "long"): string {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return style === "long"
    ? date.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })
    : date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });
}

export function formatShopDateTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Yerevan",
  });
}

export type MonthlyTotal = { month: MonthKey; revenueAmd: number; orders: number };

/** Revenue and order count for each of the `count` months ending with `lastMonth`. */
export async function getMonthlyTotals(lastMonth: MonthKey, count = 12): Promise<MonthlyTotal[]> {
  const months = Array.from({ length: count }, (_, i) => shiftMonth(lastMonth, i - (count - 1)));
  const { from } = monthRange(months[0]);
  const { to } = monthRange(lastMonth);

  const orders = await prisma.order.findMany({
    where: { status: { in: [...PAID_STATUSES] }, paidAt: { gte: from, lt: to } },
    select: { paidAt: true, totalAmd: true },
  });

  const totals = new Map<MonthKey, MonthlyTotal>(
    months.map((month) => [month, { month, revenueAmd: 0, orders: 0 }]),
  );
  for (const order of orders) {
    const bucket = order.paidAt ? totals.get(monthKeyOf(order.paidAt)) : undefined;
    if (bucket) {
      bucket.revenueAmd += order.totalAmd;
      bucket.orders += 1;
    }
  }
  return months.map((month) => totals.get(month)!);
}

export type MonthReport = Awaited<ReturnType<typeof getMonthReport>>;

/** Everything the dashboard shows for one month: totals, every transaction, best sellers. */
export async function getMonthReport(month: MonthKey) {
  const { from, to } = monthRange(month);

  const orders = await prisma.order.findMany({
    where: { status: { in: [...PAID_STATUSES] }, paidAt: { gte: from, lt: to } },
    orderBy: { paidAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { animalType: true } } } },
    },
  });

  const revenueAmd = orders.reduce((sum, order) => sum + order.totalAmd, 0);
  const itemsSold = orders.reduce(
    (sum, order) => sum + order.items.reduce((n, item) => n + item.quantity, 0),
    0,
  );

  const byProduct = new Map<string, { name: string; quantity: number; revenueAmd: number }>();
  const byAnimal = new Map<AnimalType | "OTHER", number>();
  for (const order of orders) {
    for (const item of order.items) {
      const line = item.priceAmd * item.quantity;
      const product = byProduct.get(item.productName) ?? { name: item.productName, quantity: 0, revenueAmd: 0 };
      product.quantity += item.quantity;
      product.revenueAmd += line;
      byProduct.set(item.productName, product);

      // Products deleted since the sale no longer know their animal.
      const animal = item.product?.animalType ?? "OTHER";
      byAnimal.set(animal, (byAnimal.get(animal) ?? 0) + line);
    }
  }

  return {
    month,
    revenueAmd,
    orderCount: orders.length,
    averageOrderAmd: orders.length ? Math.round(revenueAmd / orders.length) : 0,
    itemsSold,
    topProducts: [...byProduct.values()].sort((a, b) => b.revenueAmd - a.revenueAmd).slice(0, 5),
    byAnimal,
    transactions: orders.map((order) => ({
      id: order.id,
      paidAt: order.paidAt!,
      customer: order.user?.name ?? order.customerName ?? order.user?.email ?? order.customerEmail ?? "Guest",
      email: order.user?.email ?? order.customerEmail ?? "",
      isGuest: !order.userId,
      phone: order.phone,
      address: order.deliveryAddress,
      items: order.items.map((item) => `${item.quantity} × ${item.productName}`),
      deliveryFeeAmd: order.deliveryFeeAmd,
      totalAmd: order.totalAmd,
      status: order.status,
    })),
  };
}
