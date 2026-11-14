/**
 * Gives an existing account access to the admin pages (/admin).
 *
 *   1. Sign up on the website with the owner's email.
 *   2. Run:  npm run make-admin -- owner@example.com
 *   3. Sign out and sign in again.
 *
 * To take admin access away again:  npm run make-admin -- owner@example.com --remove
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const email = args.find((arg) => !arg.startsWith("--"))?.trim().toLowerCase();
  const isAdmin = !args.includes("--remove");

  if (!email) {
    console.error("Usage: npm run make-admin -- <email> [--remove]");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No account found for ${email}. Sign up on the website first, then run this again.`);
    process.exit(1);
  }

  await prisma.user.update({ where: { id: user.id }, data: { isAdmin } });
  console.log(
    isAdmin
      ? `${email} is now an admin. Sign out and back in to see the admin pages.`
      : `${email} is no longer an admin.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
