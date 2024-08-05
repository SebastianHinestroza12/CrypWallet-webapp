/* eslint-disable no-unused-vars */
import { WalletsIProps } from '../interfaces';

export type WalletCardType = {
  name: string;
  walletId: string;
  handleChangeWallet: (wallet: WalletsIProps) => void;
  handleEditWallet: (walletId: string, name: string) => void;
};

export type ExchangeDataIProps = {
  id: string;
  amount: number;
  type: 'increment' | 'decrement';
  walletId: string;
};

export type SendTransactionIProps = {
  amount: number;
  cryptocurrencyId: string;
  destinyWalletId: string;
  originWalletId: string;
  description: string;
};

export type CreateWalletIProps = {
  name: string;
};
