import Link from "next/link";
import {
  ArrowRight,
  Palette,
  BarChart3,
  Handshake,
  Sparkles,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  Play,
  ChevronRight,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { APP_ROUTES } from "@/lib/constants";

const features = [
  {
    icon: Palette,
    title: "Media Kit Builder",
    description:
      "Drag-and-drop blocks with Canva-level polish. Publish a stunning public kit in minutes.",
    badge: "Most Popular",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/25",
    iconBg: "bg-violet-500/15 text-violet-400",
    highlights: ["Custom themes & branding", "6 section types", "Live preview"],
  },
  {
    icon: Handshake,
    title: "Brand Deal Pipeline",
    description:
      "Track inquiries to paid deals in one Notion-style workspace built for creators.",
    badge: "New",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    highlights: ["Kanban pipeline view", "Contract tracking", "Payment status"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Profile views, kit downloads, and brand interest — visualized with clarity.",
    badge: "Pro",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    iconBg: "bg-amber-500/15 text-amber-400",
    highlights: [
      "Audience demographics",
      "Engagement trends",
      "Campaign metrics",
    ],
  },
];

const stats = [
  { value: "500+", label: "Active Creators" },
  { value: "$2.4M", label: "Deals Managed" },
  { value: "12K+", label: "Media Kits Built" },
  { value: "98%", label: "Creator Satisfaction" },
];

const testimonials = [
  {
    quote:
      "CreatorKit completely changed how I pitch brands. My media kit looks 10× more professional now.",
    name: "Sofia Martinez",
    handle: "@sofiacreates",
    role: "Lifestyle Creator · 280K followers",
    avatar: "SM",
    avatarBg: "from-pink-500 to-rose-500",
  },
  {
    quote:
      "The brand deal pipeline saved me hours of spreadsheet work. Everything in one place, finally.",
    name: "Marcus Chen",
    handle: "@marcustech",
    role: "Tech Reviewer · 540K followers",
    avatar: "MC",
    avatarBg: "from-blue-500 to-indigo-500",
  },
  {
    quote:
      "I closed 3 brand deals in my first week using the media kit. The analytics section alone sells it.",
    name: "Priya Sharma",
    handle: "@priyafitness",
    role: "Fitness Creator · 190K followers",
    avatar: "PS",
    avatarBg: "from-emerald-500 to-teal-500",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Build your Media Kit",
    description:
      "Choose from 6 content sections. Drag, drop, customize with your brand colors and photos.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Share your public profile",
    description:
      "Get a unique link — share it with brands directly or link from your bio.",
    icon: Globe,
  },
  {
    number: "03",
    title: "Manage incoming deals",
    description:
      "Track every brand conversation from first contact to signed contract and payment.",
    icon: Handshake,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#080810]">
      <MarketingHeader />

      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden px-4 pb-32 pt-20 md:px-6 md:pt-32">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] -z-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.6 0.25 295), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-0 top-1/3 w-72 h-72 rounded-full -z-0 opacity-20 blur-3xl"
          style={{ background: "oklch(0.65 0.22 25)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-1/4 w-96 h-96 rounded-full -z-0 opacity-15 blur-3xl"
          style={{ background: "oklch(0.60 0.20 260)" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Social proof pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              500+ creators trust CreatorKit
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl md:leading-[1.06] leading-[1.1]">
            Your creative business,{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.75 0.25 30), oklch(0.70 0.28 15))",
              }}
            >
              beautifully
            </span>{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.70 0.28 15), oklch(0.65 0.24 340))",
              }}
            >
              organized.
            </span>
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-6 max-w-xl text-base text-white/55 md:text-lg leading-relaxed">
            Build stunning creator media kits, manage brand partnerships, and
            share your public profile — all in one premium workspace.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={APP_ROUTES.dashboard}
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.60 0.25 25), oklch(0.55 0.28 10))",
              }}
            >
              Get started free
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${siteConfig.creator.defaultUsername}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              <Play className="size-3.5 fill-current" />
              View example profile
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-white/35">
            {[
              "No credit card required",
              "Free forever plan",
              "Setup in 5 minutes",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero visual — floating stat cards */}
        <div className="relative z-10 mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-4 shadow-2xl">
            {/* Mock dashboard preview */}
            <div className="rounded-xl bg-[#0d0d1a] border border-white/8 p-4">
              {/* Mock top bar */}
              <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70" />
                  <span className="size-2.5 rounded-full bg-amber-500/70" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="h-4 w-48 rounded-full bg-white/5 text-[9px] text-white/20 flex items-center px-2">
                  creatorkit.app/dashboard
                </div>
              </div>
              {/* Mock content grid */}
              <div className="grid grid-cols-4 gap-3">
                {/* Stat cards */}
                {[
                  {
                    label: "Profile Views",
                    val: "12,847",
                    change: "+24%",
                    color: "text-violet-400",
                    bg: "bg-violet-500/10",
                  },
                  {
                    label: "Active Deals",
                    val: "8",
                    change: "+3 new",
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    label: "Kit Downloads",
                    val: "2,341",
                    change: "+18%",
                    color: "text-amber-400",
                    bg: "bg-amber-500/10",
                  },
                  {
                    label: "Total Revenue",
                    val: "$24,500",
                    change: "+$4.2K",
                    color: "text-rose-400",
                    bg: "bg-rose-500/10",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-xl border border-white/5 p-3 ${card.bg}`}
                  >
                    <p className="text-[10px] text-white/40 mb-1">
                      {card.label}
                    </p>
                    <p className={`text-base font-bold ${card.color}`}>
                      {card.val}
                    </p>
                    <p className="text-[9px] text-emerald-400 mt-0.5">
                      {card.change}
                    </p>
                  </div>
                ))}
              </div>
              {/* Mock chart bar */}
              <div className="mt-3 rounded-xl border border-white/5 bg-white/2 p-3 flex items-end gap-1.5 h-16">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 11
                            ? "linear-gradient(to top, oklch(0.65 0.25 25), oklch(0.70 0.20 15))"
                            : "oklch(1 0 0 / 8%)",
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── STATS BAR ───────────── */}
      <section className="border-y border-white/5 bg-white/2 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl font-extrabold text-white md:text-4xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #fff 40%, oklch(0.75 0.22 30))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FEATURES ───────────── */}
      <section id="features" className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
              <Zap className="size-3" />
              Everything you need
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              The complete creator{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.75 0.25 30), oklch(0.65 0.24 340))",
                }}
              >
                operating system
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/45 md:text-base">
              Three powerful tools, one unified workspace. Built specifically for
              serious content creators.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/16 hover:bg-white/5 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top row */}
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${feature.iconBg}`}
                  >
                    <feature.icon className="size-5" />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {feature.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs text-white/60"
                    >
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-white/30 transition-colors group-hover:text-white/60">
                  Learn more <ChevronRight className="size-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section
        id="examples"
        className="border-t border-white/5 px-4 py-24 md:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <TrendingUp className="size-3" />
              Simple workflow
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              From zero to deal — in minutes
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/45">
              Three steps is all it takes. No design skills, no spreadsheets,
              no chaos.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {workflowSteps.map((step, idx) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {idx < workflowSteps.length - 1 && (
                  <div className="absolute left-[calc(100%+12px)] top-6 hidden h-px w-6 bg-white/10 md:block" />
                )}
                <div className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-white/10">
                      {step.number}
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 text-white/60">
                      <step.icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs text-white/45 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="border-t border-white/5 px-4 py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <Star className="size-3 fill-amber-400" />
              Creator love
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Creators are winning with CreatorKit
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarBg} text-xs font-extrabold text-white shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{t.name}</p>
                    <p className="text-[10px] text-white/40">
                      {t.handle} · {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TRUST BADGES ───────────── */}
      <section className="border-t border-white/5 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Shield, label: "SOC2 Compliant" },
              { icon: Zap, label: "99.9% Uptime" },
              { icon: Users, label: "GDPR Ready" },
              { icon: Globe, label: "Global CDN" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-xs text-white/30"
              >
                <badge.icon className="size-4 text-white/20" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA BANNER ───────────── */}
      <section className="border-t border-white/5 px-4 py-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center md:p-16"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.25 0.08 295), oklch(0.20 0.06 260))",
            }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.65 0.25 295), transparent)",
              }}
            />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center justify-center size-14 rounded-2xl bg-white/10">
                <Sparkles className="size-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Ready to level up your creator business?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-white/55">
                Join 500+ creators who use CreatorKit to land better brand
                deals, faster. It's free to get started.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={APP_ROUTES.dashboard}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#080810] shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
                >
                  Start building for free
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={`/${siteConfig.creator.defaultUsername}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white"
                >
                  See a live example
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="border-t border-white/5 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-white/10">
                <Sparkles className="size-3.5 text-white" />
              </span>
              <span className="text-sm font-bold text-white/70">CreatorKit</span>
            </div>
            <p className="text-xs text-white/25">
              © 2025 CreatorKit. Built for creators, by creators.
            </p>
            <div className="flex items-center gap-5 text-xs text-white/30">
              <Link href="#" className="hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white/60 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white/60 transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
