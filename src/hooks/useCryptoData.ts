import { useQuery } from 'react-query';
import { fetchCryptoData } from '../utils';

export const useCryptoData = () => {
  return useQuery('cryptoData', fetchCryptoData, {
    staleTime: 60000,
  });
};
