# Doggy's Shop

Online pet shop for Yerevan, Armenia — supplies for dogs, cats, birds, and hamsters, each with
Toys / Medicine / Food / Hygiene / Accessories sub-categories.

- Next.js App Router + TypeScript + Tailwind
- Postgres + Prisma
- Built so far: Home, Shop (search, filters, per-animal colors and banner), product pages,
  cart and checkout with or without an account, wishlist, order history with "buy again", and
  an owner-only admin area (sales dashboard, products, orders)

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

## Admin (adding products)

`/admin` is the owner's sales dashboard: revenue, orders and best sellers for any month, a
12-month revenue chart, every transaction of the month, and a download for Excel. Only
accounts marked as admin can open it.

The shop owner manages the catalog at `/admin/products`: add, edit and delete products, set
the price (AMD), description, animal, category, brand, stock status, and upload a photo.
Orders are at `/admin/orders`.

To make an account an admin, sign up on the site first, then run:

```bash
npm run make-admin -- owner@example.com
```

Sign out and back in, and a gear icon appears in the header.

## Delivery rule

`src/lib/delivery.ts` holds the rule in one place: delivery within Yerevan only, free, with a
10,000 AMD minimum order. The same file can switch to "paid delivery under 10,000 AMD".

## Project structure

- `src/app/page.tsx` — homepage (hero with the four animals, free-delivery banner, categories,
  newest products)
- `src/app/shop/` — shop page with search, filters and pagination; `shop-banner.tsx` is the
  colored banner with the animated animal; `[slug]/page.tsx` is the product page
- `src/app/admin/` — admin area (`products/` and `orders/`); API under `src/app/api/admin/`
- `src/app/cart/`, `src/app/api/checkout/` — cart and Stripe checkout
- `src/app/wishlist/`, `src/components/wishlist.tsx` — saved products (signed-in customers)
- `src/lib/cart-owner.ts` — account carts and guest carts (cookie-based)
- `src/lib/reports.ts` — monthly sales figures for the dashboard
- `src/lib/catalog.ts` — animals (labels and colors), categories, AMD price formatting
- `src/lib/delivery.ts` — minimum order / delivery fee rule
- `src/components/animal-art.tsx` — the four SVG mascots
- `prisma/schema.prisma` — data models; `prisma/seed.ts` — starter catalog (35 products)
- `public/logo.png` — the Doggy's Shop logo; `public/hero/pets.jpg` — homepage photo
- `design/` — reference mockups (not used at build time)

## Next phases (not built yet)

- Real product photos (upload them from the admin page)
- Grooming appointment booking (minimum 2 days lead time)
- Armenian / Russian translations
