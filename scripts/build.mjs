/**
 * Build script (`npm run build`).
 *
 * On your own computer it just builds the site. On Vercel it first prepares the database, so
 * deploying needs no terminal:
 *   1. applies any new database migrations,
 *   2. loads the starter catalog, but only if the shop has no products yet,
 *   3. builds the site.
 * If no database is connected yet, the database steps are skipped and the site still builds.
 */
import { spawnSync } from "node:child_process";

function run(command, env = process.env) {
  console.log(`\n> ${command}`);
  const result = spawnSync(command, { stdio: "inherit", shell: true, env });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("prisma generate");

if (process.env.VERCEL) {
  // Migrations need a direct (not pooled) connection; Vercel's Neon integration provides one.
  const directUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (directUrl) {
    const env = { ...process.env, DATABASE_URL: directUrl };
    run("prisma migrate deploy", env);
    run("tsx prisma/seed.ts --if-empty", env);
  } else {
    console.warn("\n! No DATABASE_URL yet — skipping database setup. Connect a database and redeploy.");
  }
}

run("next build");
