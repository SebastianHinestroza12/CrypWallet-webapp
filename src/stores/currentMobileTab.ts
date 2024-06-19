/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface StoreStateTab {
  selectedTab: string;
  setSelectedTab: (newTab: string) => void;
}

export const useStoreTab = create<StoreStateTab>((set) => ({
  selectedTab: '/home',
  setSelectedTab: (newTab) => set(() => ({ selectedTab: newTab })),
}));
