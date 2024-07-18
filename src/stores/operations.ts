import { create } from 'zustand';
import { StoreStateOperations, TransactionsType } from '../interfaces';

const cryptoShippingdataDefault = {
  amount: 0,
  cryptoCurrency: '',
  destinationWalletAddress: '',
  destinationWalletId: '',
  destinationUser: '',
  typeTransaction: TransactionsType['None'],
  cryptoData: null,
};

export const useStoreOperations = create<StoreStateOperations>((set) => ({
  transferStep: 1,
  cryptoShippingdata: cryptoShippingdataDefault,

  setTransferStep: (step) => set(() => ({ transferStep: step })),
  setCryptoShippingdata: (data) => set(() => ({ cryptoShippingdata: data })),
  removeCryptoShippingdata: () =>
    set(() => ({
      cryptoShippingdata: cryptoShippingdataDefault,
      transferStep: 1,
    })),
}));
