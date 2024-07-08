import { ChangeEvent, useEffect, useState } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import { SearchBar } from '../../components/SearchBar';
import { useSwitchStore } from '../../stores/switch';
import { ListCrypto } from '../../components/ListCrypto';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const ManageCryptocurrencies = () => {
  const { currentCrypto } = useStoreCrypto();
  const { switchStates } = useSwitchStore();
  const [crypto, setCrypto] = useState(currentCrypto);

  useEffect(() => {
    setCrypto(currentCrypto);
  }, [currentCrypto]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCrypto(currentCrypto);
      return;
    }

    setCrypto(
      currentCrypto.filter(
        (crypto) =>
          crypto.CoinInfo.FullName.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.CoinInfo.Name.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  const sortedCryptocurrencies = crypto.slice().sort((a, b) => {
    const aChecked = switchStates[a.CoinInfo.FullName.toLowerCase()] || false;
    const bChecked = switchStates[b.CoinInfo.FullName.toLowerCase()] || false;
    return (bChecked ? 1 : 0) - (aChecked ? 1 : 0);
  });

  return (
    <Stack spacing={8}>
      <SearchBar handleChange={handleChange} />
      <Box>
        {sortedCryptocurrencies.map((cryptocurrency) => (
          <ListCrypto
            key={cryptocurrency.CoinInfo.Id}
            cryptocurrency={cryptocurrency}
            showSwitches={true}
          />
        ))}
      </Box>
    </Stack>
  );
};
