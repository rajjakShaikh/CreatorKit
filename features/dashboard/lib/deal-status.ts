import type { BrandDeal, DealStatus } from "@/types";

export const dealStatusConfig: Record<
  DealStatus,
  { label: string; className: string }
> = {
  inquiry: {
    label: "Inquiry",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  negotiating: {
    label: "Negotiating",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  contracted: {
    label: "Contracted",
    className: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  },
  in_progress: {
    label: "In progress",
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  delivered: {
    label: "Delivered",
    className: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  },
  paid: {
    label: "Paid",
    className: "bg-muted text-muted-foreground",
  },
  declined: {
    label: "Declined",
    className: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
};

export function getDealStatus(deal: BrandDeal) {
  return dealStatusConfig[deal.status];
}
