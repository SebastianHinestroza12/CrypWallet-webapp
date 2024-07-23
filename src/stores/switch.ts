/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface SwitchState {
  switchStates: { [key: string]: boolean };
  toggleSwitch: (id: string) => void;
}

type MyPersist = (
  config: (set: any, get: any, api: any) => SwitchState,
  options: PersistOptions<SwitchState>,
) => (set: any, get: any, api: any) => SwitchState;

export const useSwitchStore = create<SwitchState>(
  (persist as MyPersist)(
    (set) => ({
      switchStates: {
        BTC: true,
        ETH: true,
        LTC: true,
        SOL: true,
        BNB: true,
        USDT: true,
        DOGE: true,
        BCH: true,
        TRX: true,
      },
      toggleSwitch: (id: string) =>
        set((state: { switchStates: { [x: string]: boolean } }) => ({
          switchStates: {
            ...state.switchStates,
            [id]: !state.switchStates[id],
          },
        })),
    }),
    {
      name: 'switch-storage',
    },
  ),
);
