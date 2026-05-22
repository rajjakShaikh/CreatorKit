import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaKitBlock, MediaKitBlockType } from "@/types";
import { defaultBlocks, createNewBlock } from "../lib/defaults";

interface MediaKitState {
  blocks: MediaKitBlock[];
  activeBlockId: string | null;
  previewMode: "desktop" | "mobile";
  
  // Published state
  publishedBlocks: MediaKitBlock[] | null;
  publishedPresetId: string | null;
  publishedCustomAccent: string | null;
  
  // Actions
  loadBlocks: (blocks: MediaKitBlock[]) => void;
  addBlock: (type: MediaKitBlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updates: Partial<MediaKitBlock>) => void;
  updateBlockContent: <T extends Record<string, any>>(id: string, contentUpdates: Partial<T>) => void;
  reorderBlocks: (ids: string[]) => void;
  setActiveBlockId: (id: string | null) => void;
  setPreviewMode: (mode: "desktop" | "mobile") => void;
  resetToDefault: () => void;
  publish: (activePresetId: string, customAccent: string | null) => void;
}

export const useMediaKitStore = create<MediaKitState>()(
  persist(
    (set, get) => ({
      blocks: defaultBlocks,
      activeBlockId: "block-bio", // Select bio block by default
      previewMode: "mobile",
      publishedBlocks: null,
      publishedPresetId: null,
      publishedCustomAccent: null,

      loadBlocks: (blocks) => set({ blocks: [...blocks].sort((a, b) => a.order - b.order) }),

      addBlock: (type) => {
        const { blocks } = get();
        const nextOrder = blocks.length > 0 ? Math.max(...blocks.map((b) => b.order)) + 1 : 0;
        const newBlock = createNewBlock(type, nextOrder);
        set({
          blocks: [...blocks, newBlock],
          activeBlockId: newBlock.id,
        });
      },

      removeBlock: (id) => {
        const { blocks, activeBlockId } = get();
        const updatedBlocks = blocks
          .filter((b) => b.id !== id)
          .map((b, idx) => ({ ...b, order: idx })); // normalize orders
        
        set({
          blocks: updatedBlocks,
          activeBlockId: activeBlockId === id ? null : activeBlockId,
        });
      },

      updateBlock: (id, updates) => {
        const { blocks } = get();
        set({
          blocks: blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        });
      },

      updateBlockContent: (id, contentUpdates) => {
        const { blocks } = get();
        set({
          blocks: blocks.map((b) =>
            b.id === id
              ? {
                  ...b,
                  content: {
                    ...(b.content as Record<string, any>),
                    ...contentUpdates,
                  },
                }
              : b
          ),
        });
      },

      reorderBlocks: (ids) => {
        const { blocks } = get();
        // Map ids to their new index order
        const idToIndexMap = new Map(ids.map((id, idx) => [id, idx]));
        
        const reordered = blocks
          .map((b) => {
            const newIndex = idToIndexMap.get(b.id);
            return {
              ...b,
              order: newIndex !== undefined ? newIndex : b.order,
            };
          })
          .sort((a, b) => a.order - b.order);

        set({ blocks: reordered });
      },

      setActiveBlockId: (activeBlockId) => set({ activeBlockId }),
      
      setPreviewMode: (previewMode) => set({ previewMode }),

      resetToDefault: () =>
        set({
          blocks: defaultBlocks,
          activeBlockId: "block-bio",
          previewMode: "mobile",
          publishedBlocks: null,
          publishedPresetId: null,
          publishedCustomAccent: null,
        }),

      publish: (activePresetId, customAccent) => {
        const { blocks } = get();
        set({
          publishedBlocks: JSON.parse(JSON.stringify(blocks)),
          publishedPresetId: activePresetId,
          publishedCustomAccent: customAccent,
        });
      },
    }),
    {
      name: "creatorkit-media-kit-builder",
    }
  )
);
