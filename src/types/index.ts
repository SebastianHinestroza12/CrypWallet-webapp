/* eslint-disable no-unused-vars */
import { WalletsIProps } from '../interfaces';

export type WalletCardType = {
  name: string;
  walletId: string;
  handleChangeWallet: (wallet: WalletsIProps) => void;
  handleEditWallet: (walletId: string, name: string) => void;
};

export type CreateWalletIProps = {
  name: string;
};
