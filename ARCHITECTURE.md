# CreatorKit — Frontend Architecture

Production-grade **Creator Media Kit & Brand Deal Platform** built with Next.js App Router, feature-based modules, and a layered design system.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) — same patterns as Next.js 15 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova) |
| State | Zustand (persisted theme, ephemeral UI) |
| Motion | Framer Motion (page + list animations) |
| Charts | Recharts (analytics module) |
| DnD | @dnd-kit (media kit builder module) |

## Folder structure

```
my-app/
├── app/                          # Routes only — thin pages
│   ├── layout.tsx                # Root: fonts, metadata, providers
│   ├── page.tsx                  # Marketing landing (/)
│   ├── (dashboard)/              # Route group — shared dashboard shell
│   │   ├── layout.tsx            # DashboardShell (sidebar + header)
│   │   ├── dashboard/
│   │   ├── media-kit/
│   │   │   └── builder/
│   │   ├── deals/
│   │   ├── analytics/
│   │   └── settings/theme/
│   └── (public)/
│       └── [username]/           # Public creator profile
│
├── components/
│   ├── ui/                       # shadcn primitives (do not feature-couple)
│   ├── layout/                   # App shells: sidebar, headers
│   ├── motion/                   # Framer Motion wrappers
│   ├── shared/                   # Cross-feature: Logo, PageHeader
│   └── providers/                # Theme + tooltip providers
│
├── features/                     # Feature modules (colocated logic)
│   ├── dashboard/
│   ├── media-kit/
│   ├── deals/
│   ├── analytics/
│   ├── profile/
│   └── theme/
│
├── stores/                       # Zustand global state
├── hooks/                        # Shared React hooks
├── lib/                          # Utils, constants, animation presets
├── types/                        # Domain TypeScript types
├── data/mock/                    # Static mock data (swap for API later)
└── config/                       # Site + navigation config
```

## Architecture decisions

### 1. Feature-based modules

Each product area (`media-kit`, `deals`, `analytics`, etc.) owns its components, hooks, and stores under `features/`. **App routes stay thin** — they compose feature exports and pass params. This scales when teams own features independently.

### 2. Route groups `(dashboard)` and `(public)`

Parentheses mean **no URL segment** — only shared layouts differ. Dashboard routes get `DashboardShell`; public profiles are full-bleed without sidebar.

### 3. Layered components

- **`components/ui`** — design system primitives from shadcn; never import feature code.
- **`components/layout`** — structural shells used by route groups.
- **`components/motion`** — consistent animation variants from `lib/animations.ts`.
- **`features/*`** — business UI and client logic.

### 4. State with Zustand

| Store | Responsibility |
|-------|----------------|
| `theme-store` | Preset selection, custom accent (persisted) |
| `creator-store` | Current creator profile (mock → API) |
| `ui-store` | Sidebar collapse, mobile nav |

Server Components are default; client stores only where interactivity is required.

### 5. Theme system

- **shadcn CSS variables** — light/dark via `next-themes`
- **Brand tokens** — `--brand-primary`, `--brand-accent`, `--brand-radius` applied by `ThemeCustomizer`
- **Presets** — mock data in `data/mock/theme-presets.ts`

### 6. Mock data boundary

All static data lives in `data/mock/`. Pages and stores import from here until API routes exist — single swap point for backend integration.

### 7. TypeScript

Domain types in `types/index.ts` use branded string aliases (`CreatorId`, `DealId`) for clarity at API boundaries.

## Responsive strategy

- Mobile: sheet navigation, stacked grids, full-width CTAs
- Tablet: 2-column grids
- Desktop: collapsible sidebar (`lg:`), 4-column metric grids

Breakpoints via `hooks/use-media-query.ts` and Tailwind `sm/md/lg/xl`.

## Performance

- Server Components for static pages (deals list, marketing)
- Client islands only for motion, theme, sidebar, builder
- `suppressHydrationWarning` on `<html>` for theme
- `useMounted()` guard for theme toggle / client-only UI

## Module roadmap

1. **Foundation** (this PR) — structure, layout, theme, mock data
2. **Media Kit Builder** — dnd-kit blocks, block editor store
3. **Analytics** — Recharts charts, date filters
4. **Deals** — kanban pipeline, status filters
5. **Polish** — optimistic updates, skeleton loaders, empty states

## Commands

```bash
cd my-app
npm run dev      # http://localhost:3000
npm run build    # production check
npx shadcn add <component>  # extend design system
```
