import { PaymentMethodsIprops } from '../interfaces';

export const PAYMENT_METHODS: PaymentMethodsIprops[] = [
  {
    icon: 'logos:stripe',
    label: 'Stripe',
    method: 'stripe',
  },
  {
    icon: 'arcticons:mercado-libre',
    label: 'Mercado Pago',
    color: '#00BCFF',
    method: 'mercadoPago',
  },
];
