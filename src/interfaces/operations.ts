/* eslint-disable no-unused-vars */

export interface StoreStateVisibility {
  isDataVisible: boolean;
  totalCash: number;
  symbol: string;
  totalPercentaje: number;
  isPositive: boolean | null;
  setDataVisible: () => void;
  setTotalCash: (amount: number) => void;
  setSymbol: (symbol: string) => void;
  setTotalPercentaje: (percentaje: number) => void;
  setIsPositive: (isPositive: boolean) => void;
}
