/* eslint-disable no-unused-vars */
import { IconType } from 'react-icons';
import { CryptoCompareData } from './cryptocurrency';
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

export interface StoreStateOperations {
  transferStep: number;
  cryptoShippingdata: IpropsSendCryptoData;
  setCryptoShippingdata: (data: IpropsSendCryptoData) => void;
  setTransferStep: (step: number) => void;
  removeCryptoShippingdata: () => void;
}

export interface IpropsSendCryptoData {
  amount: number | string;
  cryptoCurrency: string;
  destinationWalletAddress: string;
  destinationWalletId: string;
  destinationUser: string;
  typeTransaction: TransactionsType;
  cryptoData: CryptoCompareData | null;
}

export enum TransactionsType {
  Send = 'Send',
  Receive = 'Receive',
  Buy = 'Buy',
  Sell = 'Sell',
  Swap = 'Swap',
  None = 'None',
}

export interface OperationButtonConfig {
  id: number;
  icon: IconType;
  text: string;
  route: string;
}
