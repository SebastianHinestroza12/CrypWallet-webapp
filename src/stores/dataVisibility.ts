import { create } from 'zustand';

interface StoreStateVisibility {
  isDataVisible: boolean;
  setDataVisible: () => void;
}

export const useStoreVisibilityData = create<StoreStateVisibility>((set) => ({
  isDataVisible: false,
  setDataVisible: () => set((state) => ({ isDataVisible: !state.isDataVisible })),
}));
