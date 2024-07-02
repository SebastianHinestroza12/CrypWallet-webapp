import { Currency } from '../interfaces';
export type SupportedCurrency = 'USD' | 'EUR' | 'COP';

export const CURRENCY_FORMATS: Record<SupportedCurrency, string> = {
  USD: '$0,0.00',
  EUR: '€0,0.00',
  COP: '$0,0',
};

export const CURRENCIES: Currency[] = [
  { code: 'COP', name: 'Peso colombiano' },
  { code: 'USD', name: 'Dólar estadounidense' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Yen japonés' },
  { code: 'GBP', name: 'Libra esterlina' },
  { code: 'AUD', name: 'Dólar australiano' },
  { code: 'CAD', name: 'Dólar canadiense' },
  { code: 'CHF', name: 'Franco suizo' },
  { code: 'CNY', name: 'Yuan chino' },
  { code: 'SEK', name: 'Corona sueca' },
  { code: 'NZD', name: 'Dólar neozelandés' },
  { code: 'MXN', name: 'Peso mexicano' },
  { code: 'SGD', name: 'Dólar de Singapur' },
  { code: 'HKD', name: 'Dólar de Hong Kong' },
  { code: 'NOK', name: 'Corona noruega' },
  { code: 'KRW', name: 'Won surcoreano' },
  { code: 'TRY', name: 'Lira turca' },
  { code: 'INR', name: 'Rupia india' },
  { code: 'BRL', name: 'Real brasileño' },
  { code: 'RUB', name: 'Rublo ruso' },
  { code: 'ZAR', name: 'Rand sudafricano' },
];
