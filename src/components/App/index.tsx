import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes';
import { fetchCryptoCompareData } from '../../utils';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const App = () => {
  const { setCurrentCrypto, currency } = useStoreCrypto();

  useEffect(() => {
    const fetchData = async () => {
      const getAllCrypto = await fetchCryptoCompareData(currency);
      setCurrentCrypto(getAllCrypto);
    };

    fetchData();
  }, [currency, setCurrentCrypto]);

  return <RouterProvider router={router} />;
};
