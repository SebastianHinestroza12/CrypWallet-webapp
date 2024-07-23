import { PreferenceListData } from '../interfaces';
export type SupportedCurrency =
  | 'USD'
  | 'EUR'
  | 'COP'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'MXN'
  | 'SGD'
  | 'KRW'
  | 'TRY'
  | 'INR'
  | 'BRL'
  | 'RUB'
  | 'ZAR'
  | 'PLN'
  | 'THB'
  | 'IDR'
  | 'CZK'
  | 'ILS'
  | 'PHP'
  | 'AED'
  | 'MYR'
  | 'RON'
  | 'ARS'
  | 'NGN';

export const CURRENCY_FORMATS: Record<SupportedCurrency, string> = {
  USD: '0,0.00',
  EUR: '0,0.00',
  COP: '0,0',
  JPY: '0,0',
  GBP: '0,0.00',
  AUD: '0,0.00',
  CAD: '0,0.00',
  CHF: '0,0.00',
  NZD: '0,0.00',
  MXN: '0,0.00',
  SGD: '0,0.00',
  KRW: '0,0',
  TRY: '0,0.00',
  INR: '0,0.00',
  BRL: '0,0.00',
  RUB: '0,0.00',
  ZAR: '0,0.00',
  PLN: '0,0.00',
  THB: '0,0.00',
  IDR: '0,0',
  CZK: '0,0.00',
  ILS: '0,0.00',
  PHP: '0,0.00',
  AED: 'د.إ0,0.00',
  MYR: '0,0.00',
  RON: '0,0.00',
  ARS: '0,0.00',
  NGN: '0,0.00',
};

export const CURRENCIES: PreferenceListData[] = [
  { code: 'USD', name: 'Dólar estadounidense', icon: 'circle-flags:us' },
  { code: 'EUR', name: 'Euro', icon: 'circle-flags:eu' },
  { code: 'JPY', name: 'Yen japonés', icon: 'circle-flags:jp' },
  { code: 'GBP', name: 'Libra esterlina', icon: 'circle-flags:gb' },
  { code: 'AUD', name: 'Dólar australiano', icon: 'circle-flags:au' },
  { code: 'CAD', name: 'Dólar canadiense', icon: 'circle-flags:ca' },
  { code: 'CHF', name: 'Franco suizo', icon: 'circle-flags:ch' },
  { code: 'NZD', name: 'Dólar neozelandés', icon: 'circle-flags:nz' },
  { code: 'MXN', name: 'Peso mexicano', icon: 'circle-flags:mx' },
  { code: 'SGD', name: 'Dólar de Singapur', icon: 'circle-flags:sg' },
  { code: 'KRW', name: 'Won surcoreano', icon: 'circle-flags:kr' },
  { code: 'TRY', name: 'Lira turca', icon: 'circle-flags:tr' },
  { code: 'INR', name: 'Rupia india', icon: 'circle-flags:in' },
  { code: 'BRL', name: 'Real brasileño', icon: 'circle-flags:br' },
  { code: 'RUB', name: 'Rublo ruso', icon: 'circle-flags:ru' },
  { code: 'ZAR', name: 'Rand sudafricano', icon: 'circle-flags:za' },
  { code: 'COP', name: 'Peso colombiano', icon: 'circle-flags:co' },
  { code: 'PLN', name: 'Zloty polaco', icon: 'circle-flags:pl' },
  { code: 'THB', name: 'Baht tailandés', icon: 'circle-flags:th' },
  { code: 'IDR', name: 'Rupia indonesia', icon: 'circle-flags:id' },
  { code: 'CZK', name: 'Corona checa', icon: 'circle-flags:cz' },
  { code: 'ILS', name: 'Nuevo shéquel israelí', icon: 'circle-flags:il' },
  { code: 'PHP', name: 'Peso filipino', icon: 'circle-flags:ph' },
  { code: 'AED', name: 'Dirham de los Emiratos Árabes Unidos', icon: 'circle-flags:ae' },
  { code: 'MYR', name: 'Ringgit malayo', icon: 'circle-flags:my' },
  { code: 'RON', name: 'Leu rumano', icon: 'circle-flags:ro' },
  { code: 'ARS', name: 'Peso argentino', icon: 'circle-flags:ar' },
  { code: 'NGN', name: 'Naira nigeriana', icon: 'circle-flags:ng' },
];
