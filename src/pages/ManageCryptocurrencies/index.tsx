import { ChangeEvent, useEffect, useState } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import { ListCryptocurrenciesProps } from '../../interfaces';
import { SearchBar } from '../../components/SearchBar';
import { Layout } from '../../components/Layout';
import { useSwitchStore } from '../../stores/switch';
import { ListCrypto } from '../../components/ListCrypto';

export const ManageCryptocurrencies = ({ cryptocurrencies }: ListCryptocurrenciesProps) => {
  const [crypto, setCrypto] = useState(cryptocurrencies);
  const { switchStates } = useSwitchStore();
  useEffect(() => {
    setCrypto(cryptocurrencies);
  }, [cryptocurrencies]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCrypto(cryptocurrencies);
      return;
    }

    setCrypto(
      cryptocurrencies.filter(
        (crypto) =>
          crypto.name?.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.symbol?.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  const sortedCryptocurrencies = crypto.slice().sort((a, b) => {
    const aChecked = switchStates[a.id] || false;
    const bChecked = switchStates[b.id] || false;
    return (bChecked ? 1 : 0) - (aChecked ? 1 : 0);
  });

  return (
    <Layout>
      <Stack p={2} spacing={8}>
        <SearchBar handleChange={handleChange} />
        <Box>
          {sortedCryptocurrencies.map((cryptocurrency) => (
            <ListCrypto
              key={cryptocurrency.id}
              cryptocurrency={cryptocurrency}
              showSwitches={true}
            />
          ))}
        </Box>
      </Stack>
    </Layout>
  );
};
