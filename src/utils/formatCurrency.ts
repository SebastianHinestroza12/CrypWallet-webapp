import numeral from 'numeral';
import { CURRENCY_FORMATS, SupportedCurrency } from '../constants';

export const formatCurrency = (value: number, currency: SupportedCurrency) => {
  const format = CURRENCY_FORMATS[currency] || '0,0.00';
  return numeral(value).format(format);
};

export const formatChange = (change: number): string => {
  if (change > 0) {
    return `+${change?.toFixed(2)}%`;
  } else {
    return `${change?.toFixed(2)}%`;
  }
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};
