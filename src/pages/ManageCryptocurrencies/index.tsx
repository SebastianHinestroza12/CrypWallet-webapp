import { Stack, Box } from '@chakra-ui/react';
import { SearchBar } from '../../components/SearchBar';
import { ListCrypto } from '../../components/ListCrypto';
import { useSearchCrypto } from '../../hooks/useSearchCrypto';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const ManageCryptocurrencies = () => {
  const { currentCrypto } = useStoreCrypto();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: true,
    allCrypto: currentCrypto,
  });

  return (
    <Stack spacing={8}>
      <SearchBar handleChange={handleChange} title="manage crypto" />
      <Box>
        {crypto.map((cryptocurrency) => (
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
