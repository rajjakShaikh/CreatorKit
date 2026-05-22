import { create } from "zustand";
import { mockCreator } from "@/data/mock/creator";
import type { Creator } from "@/types";

interface CreatorState {
  creator: Creator;
  setCreator: (creator: Partial<Creator>) => void;
}

export const useCreatorStore = create<CreatorState>()((set) => ({
  creator: mockCreator,
  setCreator: (partial) =>
    set((state) => ({
      creator: { ...state.creator, ...partial },
    })),
}));
