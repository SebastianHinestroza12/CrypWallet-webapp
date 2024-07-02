/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { CryptoCompareData } from '../interfaces';

interface StoreStateCrypto {
  currency: string;
  setCurrency: (currency: string) => void;
  currentCrypto: CryptoCompareData[];
  setCurrentCrypto: (newArray: CryptoCompareData[]) => void;
}

type MyPersist = (
  config: (
    set: (fn: (prevState: StoreStateCrypto) => StoreStateCrypto) => void,
    get: any,
    api: any,
  ) => StoreStateCrypto,
  options: PersistOptions<StoreStateCrypto>,
) => (
  set: (fn: (prevState: StoreStateCrypto) => StoreStateCrypto) => void,
  get: any,
  api: any,
) => StoreStateCrypto;

export const useStoreCrypto = create(
  (persist as MyPersist)(
    (set) => ({
      //Estado global para las criptomonedas
      currentCrypto: [],
      setCurrentCrypto: (newArray) =>
        set((state) => ({
          ...state,
          currentCrypto: newArray,
        })),

      //Estado global para gestionar el cambio de divisa
      currency: 'USD',
      setCurrency: (currency) =>
        set((state) => ({
          ...state,
          currency,
        })),
    }),
    {
      name: 'crypto-storage',
    },
  ),
);
