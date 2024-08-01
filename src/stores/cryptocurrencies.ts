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
  fromCryptoSwap: CryptoCompareData | null;
  setFromCryptoSwap: (crypto: CryptoCompareData | null) => void;
  toCryptoSwap: CryptoCompareData | null;
  setToCryptoSwap: (crypto: CryptoCompareData | null) => void;
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

      // Estado global para el swap de criptomonedas
      fromCryptoSwap: null,
      setFromCryptoSwap: (crypto) =>
        set((state) => ({
          ...state,
          fromCryptoSwap: crypto,
        })),

      toCryptoSwap: null,
      setToCryptoSwap: (crypto) =>
        set((state) => ({
          ...state,
          toCryptoSwap: crypto,
        })),
    }),
    {
      name: 'crypto-storage',
    },
  ),
);
