# Creator Platform — Media Kit Builder, Analytics Bento & Deal Pipeline

A premium, production-ready SaaS platform built for creators to design customizable Media Kits (Canva + Notion-style block editor), analyze social and campaign performance via responsive bento-grids, and manage brand deals via a drag-and-drop Kanban workflow.

---

## 🚀 Key Product Pillars

### 1. Canvas-Style Media Kit Builder
* **Dynamic Canvas Layout**: Add, remove, toggle, reorder, and configure media kit sections with instant drag-and-drop interactivity.
* **Granular Editors**: Edit bio/avatar files, audience demographics, social handles, packages, testimonials, and past collaborations.
* **Device Mockup Preview**: Live mobile simulator mockup side-by-side with the editor, alongside a full-screen responsive desktop preview toggle.
* **Theme Styling Engine**: Instantly switch profiles between cohesive themes (`Minimal`, `Studio`, `Bloom`, `Link`) and customized theme presets.

### 2. High-Fidelity Creator Analytics
* **Interactive Data Visualization**: Tailored chart wrappers built with Recharts, optimized for zero-delay size adjustments and clean SVG scaling.
* **Comprehensive Metrics**: Track follower growth trends, engagement rates, audience geography distribution, social platform breakdowns, and campaign conversion rates.
* **Hydration Protection**: Implements custom client-side mounting guards (`useMounted`) to eliminate server-side layout dimension mismatch warnings.

### 3. Drag-and-Drop Deal pipeline (Kanban)
* **Visual Deal Tracking**: Transition deals between phases (`Inquiry`, `Negotiation`, `Active`, `Completed`) via `@dnd-kit/core` drag and drop.
* **Interactive Details Drawer**: Review terms, modify campaign budgets and deadlines, manage a deliverables checklist, and converse inside the Brand Discussion Hub.
* **KPI Metrics Dashboard**: View pipeline values, completed earnings, and average deal sizes at a glance.

---

## 🛠️ Technology Stack & Architecture

This project is built using modern frontend engineering standards:

* **Core Framework**: Next.js (App Router) & React 19
* **Styling**: Tailwind CSS v4 with HSL design tokens & custom theme variables
* **Drag-and-Drop**: `@dnd-kit/core` and `@dnd-kit/utilities`
* **State Management**: Zustand with persistent storage middleware
* **Motion & Animations**: Framer Motion for micro-interactions, layout transitions, and page load entry animations
* **UI Components**: Base UI and Radix primitives styled with vanilla Tailwind CSS

### Feature-Based Folder Architecture

```text
my-app/
├── app/                  # Next.js App Router (Dashboard Pages & Public Profile routes)
│   ├── (dashboard)/      # Authenticated dashboard workspace
│   └── (public)/         # SEO-optimized public creator profiles
├── components/           # Core layout headers, sidebars, and reusable UI primitives
│   ├── layout/           # Global sidebar and header layouts
│   ├── shared/           # Logo, icons, loading components
│   └── ui/               # Reusable primitives (Buttons, Inputs, Badges, etc.)
├── features/             # Feature-isolated domains (state, components, hooks)
│   ├── analytics/        # Recharts analytics visualizations & bento metrics
│   ├── deals/            # Kanban board engine, lists, add/details drawers
│   ├── media-kit/        # Builder canvas, block registry, theme style engine
│   └── profile/          # Published public profile pages
├── stores/               # Global Zustand state containers
└── hooks/                # Client utility hooks (e.g. useMounted)
```

---

## ⚡ Technical Decisions & Optimizations

### 1. Zero-Jank SSR Hydration for SVG Charts
Recharts standard `ResponsiveContainer` runs calculation routines on `window` and `document` properties. When evaluated on the server side, Next.js generates hydration mismatches and console dimension errors (`width -1`). We resolved this by implementing client-side mounting checks (`useMounted` hook) that defer chart initialization until the client browser is fully interactive.

### 2. Responsive Multi-Layout Kanban Board
Standard desktop grids force Kanban columns to shrink below readability thresholds on mobile devices. We implemented a hybrid viewport responsive design:
* **Mobile & Tablet**: Columns layout as a horizontal scrolling strip (swipe-to-view), ensuring each column maintains a readable width (`285px` - `320px`).
* **Desktop**: Automatically snaps into a 4-column viewport grid.

### 3. State Serialization & Draft Isolation
We separate the active editor state (allowing draft changes to persist locally in Zustand) from the published public state. The public profile page is hydrated strictly from the published JSON snapshot (`publishedBlocks`, `publishedPresetId`), ensuring that incomplete edits in the builder do not impact active public traffic.

### 4. Semantic Accessibility (a11y)
All buttons, icon toggles, modal dialogs, and navigation points have:
* High-contrast focus outlines for tab-based keyboard navigation.
* Dynamic screen-reader tags (`aria-label`, `aria-expanded`, `aria-current`).
* Custom keyboard-accessible checklists (accessible roles and spaces/enters triggers for deliverable items).

---

## 💻 Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
   ```bash
   npm start
   ```
<img src="/my-app/app/screenshots/Screenshot 2026-05-22 231037.png" width="100%" />

