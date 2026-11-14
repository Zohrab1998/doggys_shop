import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { getSessionUser, type SessionUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const GUEST_COOKIE = "doggys_guest_cart";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

/**
 * Who a cart belongs to: a signed-in user, or a guest identified by a random id kept in an
 * httpOnly cookie. This is what lets people shop and check out without an account.
 */
export type CartOwner =
  | { kind: "user"; user: SessionUser; where: { userId: string } }
  | { kind: "guest"; guestId: string; where: { guestId: string } };

/**
 * Resolves the cart owner for the current request. With `create`, a guest who has no cookie
 * yet gets one (only possible in Route Handlers, where cookies can be written).
 */
export async function getCartOwner(options: { create?: boolean } = {}): Promise<CartOwner | null> {
  const cookieStore = await cookies();
  const guestId = cookieStore.get(GUEST_COOKIE)?.value;

  const user = await getSessionUser();
  if (user) {
    return { kind: "user", user, where: { userId: user.id } };
  }

  if (guestId) {
    return { kind: "guest", guestId, where: { guestId } };
  }
  if (!options.create) {
    return null;
  }

  const newId = randomUUID();
  cookieStore.set(GUEST_COOKIE, newId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: THIRTY_DAYS,
    path: "/",
  });
  return { kind: "guest", guestId: newId, where: { guestId: newId } };
}

/**
 * When a guest signs in, move what they had in their guest cart into their account cart.
 * Call from a Route Handler (it clears the guest cookie).
 */
export async function mergeGuestCartIntoUser(userId: string): Promise<void> {
  const cookieStore = await cookies();
  const guestId = cookieStore.get(GUEST_COOKIE)?.value;
  if (!guestId) return;

  const guestItems = await prisma.cartItem.findMany({ where: { guestId } });
  for (const item of guestItems) {
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: item.productId } },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: Math.min(50, existing.quantity + item.quantity) },
      });
      await prisma.cartItem.delete({ where: { id: item.id } });
    } else {
      await prisma.cartItem.update({ where: { id: item.id }, data: { guestId: null, userId } });
    }
  }
  cookieStore.delete(GUEST_COOKIE);
}

/** Adds to an owner's cart, or raises the quantity if the product is already in it. */
export async function addToCart(owner: CartOwner, productId: string, quantity: number) {
  const existing = await prisma.cartItem.findFirst({ where: { ...owner.where, productId } });
  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: Math.min(50, existing.quantity + quantity) },
    });
  }
  return prisma.cartItem.create({ data: { ...owner.where, productId, quantity: Math.min(50, quantity) } });
}
