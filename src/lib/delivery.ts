/**
 * Delivery rules — one place to change them.
 *
 * Current rule: we deliver only within Yerevan, delivery is free, and an order must be at
 * least MIN_ORDER_AMD to be placed.
 *
 * To instead accept smaller orders with a paid delivery, set DELIVERY_FEE_UNDER_MIN_AMD to
 * the fee (e.g. 1000). Orders of MIN_ORDER_AMD or more stay free.
 */
export const MIN_ORDER_AMD = 10_000;
export const DELIVERY_FEE_UNDER_MIN_AMD: number | null = null;
export const DELIVERY_AREA = "Yerevan";

export type DeliveryQuote = {
  /** Whether an order with this subtotal can be placed at all. */
  allowed: boolean;
  feeAmd: number;
  /** How much more must be added to reach free delivery / the minimum (0 once reached). */
  remainingAmd: number;
  totalAmd: number;
};

export function quoteDelivery(subtotalAmd: number): DeliveryQuote {
  const remainingAmd = Math.max(0, MIN_ORDER_AMD - subtotalAmd);
  if (remainingAmd === 0) {
    return { allowed: subtotalAmd > 0, feeAmd: 0, remainingAmd, totalAmd: subtotalAmd };
  }
  if (DELIVERY_FEE_UNDER_MIN_AMD === null) {
    return { allowed: false, feeAmd: 0, remainingAmd, totalAmd: subtotalAmd };
  }
  return {
    allowed: subtotalAmd > 0,
    feeAmd: DELIVERY_FEE_UNDER_MIN_AMD,
    remainingAmd,
    totalAmd: subtotalAmd + DELIVERY_FEE_UNDER_MIN_AMD,
  };
}
