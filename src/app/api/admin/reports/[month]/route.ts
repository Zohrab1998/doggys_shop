import { AuthzError, requireAdminUser } from "@/lib/authz";
import { ORDER_STATUS_LABEL } from "@/lib/orders";
import { getMonthReport, parseMonthKey } from "@/lib/reports";

/** Escapes a value for CSV, and defuses cells a spreadsheet would run as a formula. */
function cell(value: string | number): string {
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/** Downloads one month's transactions as a spreadsheet-friendly CSV file. */
export async function GET(_req: Request, { params }: { params: Promise<{ month: string }> }) {
  try {
    await requireAdminUser();
  } catch (error) {
    const status = error instanceof AuthzError ? error.status : 500;
    return new Response("Not allowed", { status });
  }

  const month = parseMonthKey((await params).month);
  if (!month) {
    return new Response("Unknown month", { status: 400 });
  }

  const report = await getMonthReport(month);
  const rows = [
    ["Paid at (Yerevan time)", "Order", "Customer", "Email", "Phone", "Address", "Items", "Delivery (AMD)", "Total (AMD)", "Status"],
    ...report.transactions.map((t) => [
      t.paidAt.toLocaleString("en-GB", { timeZone: "Asia/Yerevan" }),
      t.id,
      t.isGuest ? `${t.customer} (guest)` : t.customer,
      t.email,
      t.phone,
      t.address,
      t.items.join("; "),
      t.deliveryFeeAmd,
      t.totalAmd,
      ORDER_STATUS_LABEL[t.status] ?? t.status,
    ]),
  ];
  // The BOM makes Excel read the file as UTF-8 (Armenian and Russian names).
  const csv = "﻿" + rows.map((row) => row.map(cell).join(",")).join("\r\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="doggys-shop-sales-${month}.csv"`,
      "cache-control": "no-store",
    },
  });
}
