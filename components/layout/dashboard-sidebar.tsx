"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { dashboardNav } from "@/config/navigation";
import { NavIcon } from "@/components/layout/nav-icon";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useCreatorStore } from "@/stores/creator-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { creator } = useCreatorStore();

  return (
    <aside
      role="complementary"
      aria-label="Dashboard Sidebar"
      className={cn(
        "hidden h-full flex-col border-r border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl text-foreground transition-[width] duration-300 lg:flex relative z-30",
        sidebarCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Top Header */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/40 px-4">
        <Logo showText={!sidebarCollapsed} />
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={toggleSidebar}
          className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors size-8"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!sidebarCollapsed}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="size-4 text-foreground/85" />
          ) : (
            <PanelLeftClose className="size-4 text-foreground/85" />
          )}
        </Button>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-6">
        <nav aria-label="Main Navigation" className="flex flex-col gap-1.5">
          {dashboardNav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={sidebarCollapsed ? item.title : undefined}
                aria-label={item.title}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all group duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                  isActive
                    ? "text-primary font-extrabold"
                    : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
                )}
              >
                {isActive && (
                  <>
                    {/* Active Background Glow */}
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-primary/8 rounded-xl border border-primary/15 shadow-2xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    {/* Left Active Accent Bar */}
                    <span className="absolute left-0.5 top-3.5 bottom-3.5 w-1 rounded-full bg-primary" />
                  </>
                )}
                <NavIcon
                  name={item.icon}
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110 relative z-10",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {!sidebarCollapsed && <span className="relative z-10">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="border-t border-zinc-200/50 dark:border-zinc-800/40 p-4 bg-muted/5">
        <div
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-2xl transition-all border border-transparent bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:border-zinc-300/40 dark:hover:border-zinc-700/40 shadow-2xs",
            sidebarCollapsed && "justify-center"
          )}
        >
          <div className="relative shrink-0">
            <Avatar className="size-9 border border-border/60 shadow-2xs">
              <AvatarImage src={creator.avatarUrl} alt={creator.displayName} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {creator.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-foreground leading-none">{creator.displayName}</p>
              <p className="truncate text-[10px] text-muted-foreground mt-1">
                @{creator.username}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
