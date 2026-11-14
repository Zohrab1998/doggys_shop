"use client";

import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "@/components/wishlist";

export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </SessionProvider>
  );
}
