import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreatorBrandDeal, KanbanStage, Comment, TimelineEvent } from "../types";
import { mockDeals } from "@/data/mock/deals";

interface DealsState {
  deals: CreatorBrandDeal[];
  searchQuery: string;
  minBudget: number | null;
  selectedStageFilter: KanbanStage | "all" | "declined";
  
  // Actions
  moveDeal: (dealId: string, targetStage: KanbanStage) => void;
  addDeal: (deal: Omit<CreatorBrandDeal, "id" | "comments" | "timeline" | "checkedDeliverables">) => void;
  updateDeal: (dealId: string, updates: Partial<CreatorBrandDeal>) => void;
  addComment: (dealId: string, content: string, role?: "creator" | "brand", authorName?: string) => void;
  toggleDeliverable: (dealId: string, index: number) => void;
  deleteDeal: (dealId: string) => void;
  setSearchQuery: (query: string) => void;
  setMinBudget: (budget: number | null) => void;
  setSelectedStageFilter: (filter: KanbanStage | "all" | "declined") => void;
  resetDeals: () => void;
}

// Convert DealStatus to KanbanStage
export const getStageFromStatus = (status: CreatorBrandDeal["status"]): KanbanStage | "declined" => {
  switch (status) {
    case "inquiry":
      return "inquiry";
    case "negotiating":
    case "contracted":
      return "negotiation";
    case "in_progress":
    case "delivered":
      return "active";
    case "paid":
      return "completed";
    case "declined":
      return "declined";
    default:
      return "inquiry";
  }
};

// Map KanbanStage back to a default DealStatus
export const getStatusFromStage = (stage: KanbanStage): CreatorBrandDeal["status"] => {
  switch (stage) {
    case "inquiry":
      return "inquiry";
    case "negotiation":
      return "negotiating";
    case "active":
      return "in_progress";
    case "completed":
      return "paid";
  }
};

const initialDecoratedDeals: CreatorBrandDeal[] = [
  {
    ...mockDeals[0], // Notion
    checkedDeliverables: [0],
    comments: [
      {
        id: "c1",
        author: { name: "Sarah (Notion)", role: "brand", avatarUrl: "" },
        content: "Hi! Excited to work together on this productivity series. Let us know when the drafts are ready.",
        createdAt: "2026-05-18T10:00:00Z",
      },
      {
        id: "c2",
        author: { name: "You", role: "creator" },
        content: "Thanks Sarah! I've started outline and script drafts. Will share the Reels script by Friday.",
        createdAt: "2026-05-18T14:30:00Z",
      },
    ],
    timeline: [
      {
        id: "t1",
        type: "deal_created",
        title: "Inquiry Received",
        description: "Notion reached out for a productivity series.",
        createdAt: "2026-05-15T09:00:00Z",
      },
      {
        id: "t2",
        type: "status_change",
        title: "Moved to Active",
        description: "Deal moved to Active production stage.",
        createdAt: "2026-05-17T11:00:00Z",
      },
      {
        id: "t3",
        type: "deliverable_toggle",
        title: "Deliverable Progress",
        description: "Completed deliverable: 3x Instagram Reels.",
        createdAt: "2026-05-20T16:00:00Z",
      },
    ],
  },
  {
    ...mockDeals[1], // Away
    checkedDeliverables: [],
    comments: [
      {
        id: "c3",
        author: { name: "Marcus (Away)", role: "brand", avatarUrl: "" },
        content: "Hey! We loved your travel Reels. What would be your rates for a dedicated 3-part TikTok series?",
        createdAt: "2026-05-20T11:15:00Z",
      },
      {
        id: "c4",
        author: { name: "You", role: "creator" },
        content: "Hi Marcus! Thanks. For a 3-part TikTok series + Instagram Story takeover, my rate is $12,000 USD. Let me know if that fits your budget.",
        createdAt: "2026-05-20T15:45:00Z",
      },
    ],
    timeline: [
      {
        id: "t4",
        type: "deal_created",
        title: "Proposal Sent",
        description: "Away reached out for a summer travel campaign.",
        createdAt: "2026-05-20T10:00:00Z",
      },
      {
        id: "t5",
        type: "status_change",
        title: "Moved to Negotiation",
        description: "Negotiating rates and deliverables.",
        createdAt: "2026-05-20T15:45:00Z",
      },
    ],
  },
  {
    ...mockDeals[2], // Figma
    checkedDeliverables: [],
    comments: [
      {
        id: "c5",
        author: { name: "Lena (Figma)", role: "brand", avatarUrl: "" },
        content: "The contract has been signed! Looking forward to the Design tools spotlight carousel.",
        createdAt: "2026-05-21T09:00:00Z",
      },
    ],
    timeline: [
      {
        id: "t6",
        type: "deal_created",
        title: "Deal Initiated",
        description: "Figma design tools spotlight.",
        createdAt: "2026-05-19T14:00:00Z",
      },
      {
        id: "t7",
        type: "status_change",
        title: "Contract Signed",
        description: "Moved to contracted stage.",
        createdAt: "2026-05-21T09:00:00Z",
      },
    ],
  },
  {
    ...mockDeals[3], // Spotify
    checkedDeliverables: [],
    comments: [
      {
        id: "c6",
        author: { name: "Jordan (Spotify)", role: "brand", avatarUrl: "" },
        content: "Hi there! We are launching a new indie playlist discovery feature and wanted to check your availability for June/July.",
        createdAt: "2026-05-22T08:30:00Z",
      },
    ],
    timeline: [
      {
        id: "t8",
        type: "deal_created",
        title: "Inquiry Logged",
        description: "Inquiry received from Jordan at Spotify.",
        createdAt: "2026-05-22T08:30:00Z",
      },
    ],
  },
  {
    ...mockDeals[4], // Arc Browser
    checkedDeliverables: [0, 1],
    comments: [
      {
        id: "c7",
        author: { name: "Ben (Arc)", role: "brand", avatarUrl: "" },
        content: "Awesome work on the YouTube video! Views are looking great. Payment has been processed.",
        createdAt: "2026-04-10T11:00:00Z",
      },
    ],
    timeline: [
      {
        id: "t9",
        type: "deal_created",
        title: "Deal Initiated",
        description: "Arc Browser creator review.",
        createdAt: "2026-03-25T10:00:00Z",
      },
      {
        id: "t10",
        type: "deliverable_toggle",
        title: "All Deliverables Completed",
        description: "YouTube review and Twitter thread completed.",
        createdAt: "2026-04-01T15:00:00Z",
      },
      {
        id: "t11",
        type: "status_change",
        title: "Payment Received",
        description: "Payment of $3,200 USD processed.",
        createdAt: "2026-04-10T11:00:00Z",
      },
    ],
  },
];

export const useDealsStore = create<DealsState>()(
  persist(
    (set, get) => ({
      deals: initialDecoratedDeals,
      searchQuery: "",
      minBudget: null,
      selectedStageFilter: "all",

      moveDeal: (dealId, targetStage) => set((state) => {
        const newStatus = getStatusFromStage(targetStage);
        return {
          deals: state.deals.map((deal) => {
            if (deal.id === dealId) {
              const oldStage = getStageFromStatus(deal.status);
              if (oldStage === targetStage) return deal;
              
              const stageLabels: Record<KanbanStage, string> = {
                inquiry: "Inquiry",
                negotiation: "Negotiation",
                active: "Active",
                completed: "Completed",
              };

              const newTimelineEvent: TimelineEvent = {
                id: `t_${Date.now()}`,
                type: "status_change",
                title: `Moved to ${stageLabels[targetStage]}`,
                description: `Deal status updated to ${newStatus.replace("_", " ")}.`,
                createdAt: new Date().toISOString(),
              };

              return {
                ...deal,
                status: newStatus,
                timeline: [newTimelineEvent, ...deal.timeline],
              };
            }
            return deal;
          }),
        };
      }),

      addDeal: (dealData) => set((state) => {
        const newId = `deal_${Date.now()}`;
        const newDeal: CreatorBrandDeal = {
          ...dealData,
          id: newId,
          checkedDeliverables: [],
          comments: [],
          timeline: [
            {
              id: `t_${Date.now()}`,
              type: "deal_created",
              title: "Deal Created",
              description: `Brand partnership with ${dealData.brandName} initiated.`,
              createdAt: new Date().toISOString(),
            },
          ],
        };
        return {
          deals: [newDeal, ...state.deals],
        };
      }),

      updateDeal: (dealId, updates) => set((state) => {
        return {
          deals: state.deals.map((deal) => {
            if (deal.id === dealId) {
              const timelineEvents: TimelineEvent[] = [];
              
              if (updates.budget !== undefined && updates.budget !== deal.budget) {
                timelineEvents.push({
                  id: `t_budget_${Date.now()}`,
                  type: "budget_update",
                  title: "Budget Updated",
                  description: `Budget updated from ${deal.currency} ${deal.budget} to ${deal.currency} ${updates.budget}.`,
                  createdAt: new Date().toISOString(),
                });
              }

              if (updates.dueDate !== undefined && updates.dueDate !== deal.dueDate) {
                timelineEvents.push({
                  id: `t_date_${Date.now()}`,
                  type: "due_date_update",
                  title: "Due Date Updated",
                  description: `Deadline changed from ${deal.dueDate} to ${updates.dueDate}.`,
                  createdAt: new Date().toISOString(),
                });
              }

              if (updates.status !== undefined && updates.status !== deal.status) {
                timelineEvents.push({
                  id: `t_status_${Date.now()}`,
                  type: "status_change",
                  title: "Status Updated",
                  description: `Status changed to ${updates.status.replace("_", " ")}.`,
                  createdAt: new Date().toISOString(),
                });
              }

              return {
                ...deal,
                ...updates,
                timeline: [...timelineEvents, ...deal.timeline],
              };
            }
            return deal;
          }),
        };
      }),

      addComment: (dealId, content, role = "creator", authorName = "You") => set((state) => {
        const commentId = `c_${Date.now()}`;
        const newComment: Comment = {
          id: commentId,
          author: {
            name: authorName,
            role,
          },
          content,
          createdAt: new Date().toISOString(),
        };

        const timelineEvent: TimelineEvent = {
          id: `t_comment_${Date.now()}`,
          type: "comment",
          title: role === "creator" ? "Comment Added" : "Response Received",
          description: `${authorName} commented on the deliverables.`,
          createdAt: new Date().toISOString(),
        };

        return {
          deals: state.deals.map((deal) => {
            if (deal.id === dealId) {
              return {
                ...deal,
                comments: [...deal.comments, newComment],
                timeline: [timelineEvent, ...deal.timeline],
              };
            }
            return deal;
          }),
        };
      }),

      toggleDeliverable: (dealId, index) => set((state) => {
        return {
          deals: state.deals.map((deal) => {
            if (deal.id === dealId) {
              const exists = deal.checkedDeliverables.includes(index);
              let newChecked: number[];
              if (exists) {
                newChecked = deal.checkedDeliverables.filter((i) => i !== index);
              } else {
                newChecked = [...deal.checkedDeliverables, index].sort();
              }

              const deliverableName = deal.deliverables[index] || `Deliverable #${index + 1}`;
              const timelineEvent: TimelineEvent = {
                id: `t_del_${Date.now()}_${index}`,
                type: "deliverable_toggle",
                title: exists ? "Deliverable Reopened" : "Deliverable Completed",
                description: `${exists ? "Reopened" : "Completed"}: "${deliverableName}"`,
                createdAt: new Date().toISOString(),
              };

              return {
                ...deal,
                checkedDeliverables: newChecked,
                timeline: [timelineEvent, ...deal.timeline],
              };
            }
            return deal;
          }),
        };
      }),

      deleteDeal: (dealId) => set((state) => ({
        deals: state.deals.filter((deal) => deal.id !== dealId),
      })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setMinBudget: (minBudget) => set({ minBudget }),
      setSelectedStageFilter: (selectedStageFilter) => set({ selectedStageFilter }),
      resetDeals: () => set({ deals: initialDecoratedDeals }),
    }),
    { name: "creatorkit-deals" }
  )
);
