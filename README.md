# Doggy's Shop

Online pet shop for Yerevan, Armenia — supplies for dogs, cats, birds, and hamsters, each with
Toys / Medicine / Food / Hygiene / Accessories sub-categories.

- Next.js App Router + TypeScript + Tailwind
- Postgres + Prisma
- Phase 1 scope: Home, Shop (browse + filters), About Us, Contact Us — no cart/checkout, accounts,
  grooming booking, or delivery logic yet (those are next phases)

## Prerequisites

- Node.js 20+
- A Postgres database — Docker (`docker compose up -d`, see `docker-compose.yml`) or a free
  hosted instance (e.g. [Neon](https://neon.tech))

## Quick start

```bash
git clone https://github.com/Zohrab1998/doggys_shop.git
cd doggys_shop
npm install
cp .env.example .env   # then set DATABASE_URL
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Open http://localhost:3000.

If `npm install` warns about packages with pending install scripts (`prisma`, etc.), run
`npm approve-scripts --allow-scripts-pending` then `npm install` again.

## Project structure

- `src/app/page.tsx` — homepage (hero, shop-by-animal links, featured categories, top rated
  products)
- `src/app/shop/` — product browse page with animal/category/brand/price filters
  (`filter-sidebar.tsx`)
- `src/app/about/`, `src/app/contact/` — static About Us page and a Contact Us form
  (`src/app/api/contact/route.ts` stores submissions as `ContactMessage` rows)
- `src/lib/catalog.ts` — animal type / category label helpers, AMD price formatting
- `prisma/schema.prisma` — `Product`, `Brand`, `ContactMessage` models
- `prisma/seed.ts` — sample brands + ~40 products across all animal types and categories
- `design/` — reference mockups provided for the homepage/shop layout (not used at build time)

## Next phases (not built yet)

- Cart, checkout, and accounts
- Grooming appointment booking (minimum 2 days lead time)
- Delivery limited to Yerevan city
- Swap the placeholder text logo for the real "Doggy's Shop" logo asset
