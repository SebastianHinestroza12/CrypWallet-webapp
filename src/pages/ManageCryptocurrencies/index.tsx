import { Stack, Box } from '@chakra-ui/react';
import { SearchBar } from '../../components/SearchBar';
import { ListCrypto } from '../../components/ListCrypto';
import { useSearchCrypto } from '../../hooks/useSearchCrypto';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { useTranslation } from 'react-i18next';

export const ManageCryptocurrencies = () => {
  const { currentCrypto } = useStoreCrypto();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: true,
    allCrypto: currentCrypto,
  });
  const { t } = useTranslation();

  return (
    <Stack spacing={8}>
      <SearchBar handleChange={handleChange} title={t('search.title_manage_crypto')} />
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
