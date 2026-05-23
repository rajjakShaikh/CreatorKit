"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const isBuilder = pathname === "/media-kit/builder";

  return (
    // h-screen + overflow-hidden on the outer shell ensures the sidebar is
    // always exactly viewport height — sticky bottom profile, no scroll — on EVERY page.
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <DashboardHeader />

        {isBuilder ? (
          // Builder: no padding wrapper, content manages its own layout
          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        ) : (
          // All other pages: scrollable main with consistent padding
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
              {children}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
