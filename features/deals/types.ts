import type { BrandDeal, DealStatus } from "@/types";

export type KanbanStage = "inquiry" | "negotiation" | "active" | "completed";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
    role: "creator" | "brand";
  };
  content: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: "status_change" | "comment" | "deliverable_toggle" | "deal_created" | "budget_update" | "due_date_update";
  title: string;
  description: string;
  createdAt: string;
}

export interface CreatorBrandDeal extends BrandDeal {
  checkedDeliverables: number[]; // indices of completed deliverables
  comments: Comment[];
  timeline: TimelineEvent[];
}
