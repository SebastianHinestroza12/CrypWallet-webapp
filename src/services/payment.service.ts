import { AxiosError } from 'axios';
import { instanceAxios } from '../utils';
import { RequestPaymentStripeIprops } from '../interfaces';

export class PaymentService {
  static async paymentWithStripe(data: RequestPaymentStripeIprops) {
    try {
      return await instanceAxios.post('/payment/create-checkout-session', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
