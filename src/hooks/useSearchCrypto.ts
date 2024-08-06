import { useState, useEffect, ChangeEvent } from 'react';
import { useSwitchStore } from '../stores/switch';
import { CryptoCompareData } from '../interfaces';

interface UseSearchCryptoProps {
  filterSwitch?: boolean;
  allCrypto: CryptoCompareData[];
}

export const useSearchCrypto = ({ filterSwitch = false, allCrypto }: UseSearchCryptoProps) => {
  const { switchStates } = useSwitchStore();
  const [crypto, setCrypto] = useState(allCrypto);

  useEffect(() => {
    setCrypto(allCrypto);
  }, [allCrypto]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCrypto(allCrypto);
      return;
    }

    setCrypto(
      allCrypto.filter(
        (crypto) =>
          crypto.CoinInfo.FullName.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.CoinInfo.Name.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  const sortedCryptocurrencies = filterSwitch
    ? crypto.slice().sort((a, b) => {
        const aChecked = switchStates[a.CoinInfo.Name] || false;
        const bChecked = switchStates[b.CoinInfo.Name] || false;
        return (bChecked ? 1 : 0) - (aChecked ? 1 : 0);
      })
    : crypto;

  return {
    crypto: sortedCryptocurrencies,
    handleChange,
  };
};
