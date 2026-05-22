"use client";

import Link from "next/link";
import { Menu, Moon, Sun, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { dashboardNav } from "@/config/navigation";
import { NavIcon } from "@/components/layout/nav-icon";
import { siteConfig } from "@/config/site";
import { useCreatorStore } from "@/stores/creator-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();
  const { creator } = useCreatorStore();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-14 items-center border-b px-4">
              <Logo />
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {dashboardNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50"
                  )}
                >
                  <NavIcon name={item.icon} className="size-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block lg:flex-1" />

      <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
        <Button
          variant="outline"
          size="sm"
          render={
            <Link
              href={`/${creator.username}`}
              target="_blank"
              className="gap-2"
              aria-label="View public profile (opens in new tab)"
            />
          }
        >
          <ExternalLink className="size-3.5" />
          <span className="hidden sm:inline">View profile</span>
        </Button>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        )}
      </div>
    </header>
  );
}
