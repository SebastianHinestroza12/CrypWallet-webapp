import { create } from 'zustand';
import { StoreStateVisibility } from '../interfaces';

export const useStoreVisibilityData = create<StoreStateVisibility>((set) => ({
  isDataVisible: false,
  totalCash: 0,
  symbol: '',
  totalPercentaje: 0,
  isPositive: null,

  setDataVisible: () => set((state) => ({ isDataVisible: !state.isDataVisible })),
  setTotalCash: (amount) => set(() => ({ totalCash: amount })),
  setSymbol: (symbol) => set(() => ({ symbol })),
  setTotalPercentaje: (percentaje) => set(() => ({ totalPercentaje: percentaje })),
  setIsPositive: (isPositive) => set(() => ({ isPositive })),
}));
