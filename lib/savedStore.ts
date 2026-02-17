import { create } from "zustand";

type SavedState = {
  projectIds: string[];
  loaded: boolean;
  setProjectIds: (ids: string[]) => void;
  setLoaded: (v: boolean) => void;
  toggleLocal: (projectId: string) => void;
};

export const useSavedStore = create<SavedState>((set, get) => ({
  projectIds: [],
  loaded: false,

  setProjectIds: (ids) => set({ projectIds: ids }),
  setLoaded: (v) => set({ loaded: v }),

  toggleLocal: (projectId) => {
    const current = get().projectIds;
    const has = current.includes(projectId);
    set({
      projectIds: has
        ? current.filter((x) => x !== projectId)
        : [...current, projectId],
    });
  },
}));
