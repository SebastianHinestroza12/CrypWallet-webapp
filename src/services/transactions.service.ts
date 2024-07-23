import { AxiosError } from 'axios';
import { instanceAxios } from '../utils';
import { SendTransactionIProps } from '../types';

export class TransactionService {
  static async sendCrypto(data: SendTransactionIProps) {
    try {
      return await instanceAxios.post('/transaction/send-crypto', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
