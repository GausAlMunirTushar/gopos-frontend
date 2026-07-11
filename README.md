# goPOS Frontend

Web client for **goPOS**, a multi-tenant point-of-sale and retail management system. Next.js (App Router) + React 19 + TypeScript, talking to [`gopos-backend`](../gopos-backend) over REST.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · TanStack Query · TanStack Table · Zustand · React Hook Form + Zod · next-intl · pnpm

## Getting Started

```bash
pnpm install
```

Point the client at the backend (defaults to `http://localhost:5000/api/v1` if unset):

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The backend must be running — see [`gopos-backend`](../gopos-backend).

## Scripts

| Command      | Purpose                     |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start the dev server        |
| `pnpm build` | Production build            |
| `pnpm start` | Run the production build    |
| `pnpm lint`  | Lint with ESLint            |

## Architecture

### Routing — `src/app`

- **`(auth)`** — `login`, `register`, `forgot-password`, `reset-password`, `verify`.
- **`(main)`** — the authenticated back-office, one folder per module: `dashboard`, `inventory`, `stock`, `purchases`, `sales`, `peoples`, `customers`, `promo`, `finance`, `hrm`, `reports`, `settings`, `super-admin`.
- **`pos`** — the point-of-sale terminal, outside the back-office shell.
- **`lock`**, **`coming-soon`** — session lock screen and placeholder for unbuilt modules.

Pages stay thin: a route wires up data fetching and renders a component from `src/components/<domain>`, which owns the actual UI.

### UI — `src/components`

- **`ui/`** — primitives (button, input, select, table, data-table, dropdown-menu, card) on Radix UI, styled with Tailwind.
- **`shared/`** — cross-module building blocks (`PageHeader`, `FilterCard`, `StatsCard`, `ResourceCreateModal`) that keep list/CRUD pages consistent.
- **`layout/`** — app chrome (`AppHeader`, `AppLayout`).
- **Per-domain folders** — `inventory/`, `sales/`, `purchases/`, `stock/`, `finance/`, `hrm/`, `peoples/`, `promo/`, `reports/`, each with that domain's list views and workflow modals.

`src/features/` holds larger, self-contained flows that bundle their own components — currently `auth` and `pos`.

### Data — `src/lib/api`, `src/hooks/api`

- **`client.ts`** — thin `fetch` wrapper (`apiClient.get/post/patch`) that attaches the bearer token, targets `NEXT_PUBLIC_API_URL`, unwraps the backend's `{ success, data, message, meta }` envelope, and throws `ApiError` on failure.
- **`endpoints.ts`** — single source of truth mapping each domain to its REST paths, mirroring the backend's module boundaries.
- **`row-mappers.ts`, `resource-fields.ts`** — adapt raw API records into the shapes the shared table components expect.
- **`useApiResource.ts`** — generic TanStack Query hooks (`useApiResource`, `useCreateApiResource`) most CRUD screens build on, with consistent caching/invalidation.
- **`useLiveRows.ts`** — adds client-side search/sort/pagination on top of `useApiResource`.

### Auth — `src/lib/auth`, `src/features/auth`

Access/refresh tokens and the current user/organization are stored in `localStorage` (`gopos.session`); the API client reads them on every request. Login/register/forgot-password forms (React Hook Form + Zod) populate the session on success.

### State

- **Server state** — TanStack Query only; no manual caching of API data.
- **Client state** — Zustand (`src/stores`), e.g. `settingsStore` for the display currency, persisted to `localStorage`.

### i18n

`next-intl`, locale files in `src/messages/{en,bn}.json`. Locale is resolved server-side in `src/i18n/request.ts` via `src/services/locale.ts`.

## Project Structure

```
src/
├── app/         App Router routes: auth, main back-office, pos, lock
├── components/  UI primitives + per-domain feature components
├── features/    Self-contained flows (auth, pos)
├── hooks/       Data hooks (useApiResource, useLiveRows) + utilities
├── i18n/        next-intl request config
├── lib/
│   ├── api/     API client, endpoint map, row/field adapters
│   └── auth/    Session storage
├── messages/    en.json / bn.json translations
├── services/    Locale resolution
├── stores/      Zustand stores
└── types/       Shared API/domain types
```

## Related

- [`gopos-backend`](../gopos-backend) — Express + Prisma + PostgreSQL API (default port `5000`).
