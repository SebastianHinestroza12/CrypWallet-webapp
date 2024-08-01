/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { StorePaymentIProps, PaymentDetailIProps } from '../interfaces';

type MyPersist = (
  config: (set: any, get: any, api: any) => StorePaymentIProps,
  options: PersistOptions<StorePaymentIProps>,
) => (set: any, get: any, api: any) => StorePaymentIProps;

export const useStorePaymentMethods = create<StorePaymentIProps>(
  (persist as MyPersist)(
    (set) => ({
      selectedPaymentMethod: '',
      setPaymentMethods: (method: string) => set({ selectedPaymentMethod: method }),
      saveDataPayment: null,
      setSaveDataPayment: (data: PaymentDetailIProps | null) => set({ saveDataPayment: data }),
    }),
    {
      name: 'store-payment-methods',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
