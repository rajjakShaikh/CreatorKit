import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { CreatorBrandDeal, KanbanStage } from "../types";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { useDealsStore, getStageFromStatus } from "../store/deals-store";

interface KanbanBoardProps {
  deals: CreatorBrandDeal[];
  onCardClick: (deal: CreatorBrandDeal) => void;
}

export function KanbanBoard({ deals, onCardClick }: KanbanBoardProps) {
  const moveDeal = useDealsStore((state) => state.moveDeal);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Set up pointer constraints to allow clicks on card actions/details
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag starts only after moving 8px, preserving clicks!
      },
    })
  );

  // Group deals by their current Kanban stage
  const dealsByStage = {
    inquiry: deals.filter((d) => getStageFromStatus(d.status) === "inquiry"),
    negotiation: deals.filter((d) => getStageFromStatus(d.status) === "negotiation"),
    active: deals.filter((d) => getStageFromStatus(d.status) === "active"),
    completed: deals.filter((d) => getStageFromStatus(d.status) === "completed"),
  };

  const columns: { stage: KanbanStage; title: string }[] = [
    { stage: "inquiry", title: "Inquiry" },
    { stage: "negotiation", title: "Negotiation" },
    { stage: "active", title: "Active" },
    { stage: "completed", title: "Completed" },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeDealId = active.id as string;
    const targetStage = over.id as KanbanStage;

    // Check if the target is one of the columns
    if (["inquiry", "negotiation", "active", "completed"].includes(targetStage)) {
      moveDeal(activeDealId, targetStage);
    }
  };

  // Find the active deal being dragged for the DragOverlay
  const activeDeal = deals.find((d) => d.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row lg:grid lg:grid-cols-4 gap-6 items-start overflow-x-auto lg:overflow-x-visible pb-4 w-full">
        {columns.map((col) => (
          <KanbanColumn
            key={col.stage}
            stage={col.stage}
            title={col.title}
            deals={dealsByStage[col.stage]}
          >
            {dealsByStage[col.stage].map((deal) => (
              <KanbanCard
                key={deal.id}
                deal={deal}
                onClick={() => onCardClick(deal)}
              />
            ))}
          </KanbanColumn>
        ))}
      </div>

      {/* Overlay for floating drag indicator */}
      <DragOverlay dropAnimation={null}>
        {activeDeal ? (
          <div className="rotate-[2deg] scale-[1.03] shadow-2xl opacity-90 pointer-events-none">
            <KanbanCard deal={activeDeal} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
