import { instanceAxios } from '../utils';
import { AxiosError } from 'axios';
import { CreateWalletIProps } from '../types';

export class WalletServices {
  static async createWallet(dataWallet: CreateWalletIProps, userId: string) {
    try {
      return await instanceAxios.post(`/wallet/${userId}`, dataWallet);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async getAllWallets(userId: string) {
    try {
      return await instanceAxios.get(`/wallet/user/${userId}`);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async deleteWallet(walletId: string, userId: string) {
    try {
      return await instanceAxios.delete(`/wallet/delete/${walletId}/${userId}`);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async updateWallet(walletId: string, dataWallet: CreateWalletIProps) {
    try {
      return await instanceAxios.patch(`/wallet/update/${walletId}`, dataWallet);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async getWalletByAddress(address: string) {
    try {
      return await instanceAxios.get(`/wallet/address/${address}`);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
