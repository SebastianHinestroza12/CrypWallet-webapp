export type SupportedCurrency = 'USD' | 'EUR' | 'COP';

export const CURRENCY_FORMATS: Record<SupportedCurrency, string> = {
  USD: '$0,0.00',
  EUR: '€0,0.00',
  COP: '$0,0',
};
