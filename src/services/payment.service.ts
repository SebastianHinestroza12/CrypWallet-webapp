import { AxiosError } from 'axios';
import { instanceAxios } from '../utils';
import { RequestPaymentStripeIprops, PaymentDetailIProps } from '../interfaces';

export class PaymentService {
  static async paymentWithStripe(data: RequestPaymentStripeIprops) {
    try {
      return await instanceAxios.post('/payment/create-checkout-session', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async handlePaymentIntent(data: PaymentDetailIProps) {
    try {
      return await instanceAxios.post('/transaction/crypto-purchase', data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
