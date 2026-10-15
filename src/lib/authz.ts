import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type SessionUser = {
  id: string;
  isAdmin: boolean;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export class AuthzError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    isAdmin: session.user.isAdmin,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new AuthzError("Authentication required.", 401);
  }
  return user;
}

export async function requireAdminUser(): Promise<SessionUser> {
  const user = await requireUser();
  if (!user.isAdmin) {
    throw new AuthzError("Admin access required.", 403);
  }
  return user;
}
