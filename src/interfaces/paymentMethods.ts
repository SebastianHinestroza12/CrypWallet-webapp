/* eslint-disable no-unused-vars */
export interface StorePaymentIProps {
  selectedPaymentMethod: string;
  setPaymentMethods: (method: string) => void;
  saveDataPayment: PaymentDetailIProps | null;
  setSaveDataPayment: (data: PaymentDetailIProps | null) => void;
}

export interface PaymentMethodsIprops {
  icon: string;
  label: string;
  method: 'stripe' | 'mercado-pago';
  color?: string;
}

export interface PaymentDetailIProps {
  cryptoID: string;
  amount: number;
  idPayment: string;
  paymentGateway: string;
  originWalletId: string;
}

export interface RequestPaymentStripeIprops {
  nameCrypto: string;
  currency: string;
  unit_amount: number;
  urlImage: string;
  customer_email: string;
}
