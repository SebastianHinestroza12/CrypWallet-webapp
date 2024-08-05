import { AxiosError } from 'axios';
import { instanceAxios } from '../utils';
import { SendTransactionIProps, ExchangeDataIProps } from '../types';

export class TransactionService {
  static async sendCrypto(data: SendTransactionIProps) {
    try {
      return await instanceAxios.post('/transaction/send-crypto', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async swapCrypto(data: ExchangeDataIProps[]) {
    try {
      return await instanceAxios.post('/transaction/swap-crypto', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async getAllTransaction(userId: string) {
    try {
      return await instanceAxios.get(`/transaction/${userId}`);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
