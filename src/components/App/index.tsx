import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes';
import { fetchCryptoData } from '../../utils';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const App = () => {
  const { setCurrentCrypto } = useStoreCrypto();

  useEffect(() => {
    const fetchData = async () => {
      const getAllCrypto = await fetchCryptoData();
      setCurrentCrypto(getAllCrypto);
    };

    fetchData();
  }, [setCurrentCrypto]);

  return <RouterProvider router={router} />;
};
