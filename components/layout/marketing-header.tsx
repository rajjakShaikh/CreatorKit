"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Creators", href: "#testimonials" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#080810]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={APP_ROUTES.dashboard} />}
            className="hidden text-xs text-white/60 hover:text-white sm:flex"
          >
            Log in
          </Button>
          <Link
            href={APP_ROUTES.dashboard}
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, oklch(0.60 0.25 25), oklch(0.55 0.28 10))",
            }}
          >
            Get started
            <ArrowRight className="size-3" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#080810]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 border-t border-white/8 pt-3">
              <Link
                href={APP_ROUTES.dashboard}
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, oklch(0.60 0.25 25), oklch(0.55 0.28 10))",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Enter Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
