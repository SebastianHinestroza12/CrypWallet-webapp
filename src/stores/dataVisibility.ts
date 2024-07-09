/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface StoreStateVisibility {
  isDataVisible: boolean;
  setDataVisible: () => void;
  totalCash: number;
  setTotalCash: (amount: number) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
}

export const useStoreVisibilityData = create<StoreStateVisibility>((set) => ({
  isDataVisible: false,
  totalCash: 0,
  symbol: '',

  setDataVisible: () => set((state) => ({ isDataVisible: !state.isDataVisible })),
  setTotalCash: (amount) => set(() => ({ totalCash: amount })),
  setSymbol: (symbol) => set(() => ({ symbol })),
}));
