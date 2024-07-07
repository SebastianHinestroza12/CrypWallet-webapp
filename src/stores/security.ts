/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface SecurityState {
  isPassCodeEnabled: boolean;
  togglePassCode: () => void;
}

type MyPersist = (
  config: (set: any, get: any) => SecurityState,
  options: PersistOptions<SecurityState>,
) => (set: any, get: any, api: any) => SecurityState;

export const useSecurityStore = create<SecurityState>(
  (persist as MyPersist)(
    (set) => ({
      isPassCodeEnabled: true,
      togglePassCode: () =>
        set((state: { isPassCodeEnabled: boolean }) => ({
          isPassCodeEnabled: !state.isPassCodeEnabled,
        })),
    }),
    {
      name: 'security-storage',
    },
  ),
);
