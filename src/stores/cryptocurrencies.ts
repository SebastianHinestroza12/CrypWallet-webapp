/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { CryptoData } from '../interfaces';

interface StoreStateCrypto {
  currentCrypto: CryptoData[];
  setCurrentCrypto: (newArray: CryptoData[]) => void;
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

export const useStoreCrypto = create<StoreStateCrypto>(
  (persist as MyPersist)(
    (set) => ({
      currentCrypto: [],
      setCurrentCrypto: (newArray: CryptoData[]) => set(() => ({ currentCrypto: newArray }) as any),
    }),
    {
      name: 'crypto-storage',
    },
  ),
);
