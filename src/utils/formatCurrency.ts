import numeral from 'numeral';
import { CURRENCY_FORMATS, SupportedCurrency } from '../constants';

export const formatCurrency = (value: number, currency: SupportedCurrency) => {
  const format = CURRENCY_FORMATS[currency] || '0,0.00';
  return numeral(value).format(format);
};
