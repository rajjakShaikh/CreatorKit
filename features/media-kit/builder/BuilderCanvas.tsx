"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMediaKitStore } from "../store/media-kit-store";
import { blockRegistry } from "../blocks";
import { SortableBlockWrapper } from "./SortableBlockWrapper";
import { PageHeader, EmptyState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Palette, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BuilderCanvas() {
  const {
    blocks,
    activeBlockId,
    reorderBlocks,
    setActiveBlockId,
    removeBlock,
    updateBlock,
    addBlock,
  } = useMediaKitStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px drag movement to start dragging, letting clicks fire normally
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      
      const newOrder = [...blocks];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);

      reorderBlocks(newOrder.map((b) => b.id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {blocks.map((block) => {
                  const registry = blockRegistry[block.type];
                  if (!registry) return null;
                  const DisplayComponent = registry.display;

                  return (
                    <motion.div
                      key={block.id}
                      layoutId={`wrapper-${block.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <SortableBlockWrapper
                        id={block.id}
                        type={registry.label}
                        title={block.title || registry.label}
                        isActive={activeBlockId === block.id}
                        isVisible={block.visible}
                        onClick={() => setActiveBlockId(block.id)}
                        onDelete={() => removeBlock(block.id)}
                        onToggleVisibility={() =>
                          updateBlock(block.id, { visible: !block.visible })
                        }
                      >
                        <DisplayComponent content={block.content} />
                      </SortableBlockWrapper>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {blocks.length === 0 && (
                <EmptyState
                  title="Canvas is empty"
                  description="Add content sections from the sidebar to build your media kit."
                  icon={<Palette className="size-5" />}
                  action={
                    <div className="flex gap-2">
                      <Button onClick={() => addBlock("bio")}>Add About Me</Button>
                      <Button variant="outline" onClick={() => addBlock("social")}>
                        Add Socials
                      </Button>
                    </div>
                  }
                />
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
