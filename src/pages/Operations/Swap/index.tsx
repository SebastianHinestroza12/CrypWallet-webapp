import { Stack, Box, Flex } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { ListCrypto } from '../../../components/ListCrypto';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchCrypto } from '../../../hooks/useSearchCrypto';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { InviteToLogin } from '../../../components/InviteToLogin';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';
import { useTranslation } from 'react-i18next';
import { EmptySearch } from '../../../components/EmptySearch';

export const SwapList = () => {
  const { currency, currentCrypto } = useStoreCrypto();
  const { isAuthenticated } = useStoreAutheticated();
  const { search } = useLocation();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: false,
    allCrypto: currentCrypto,
  });
  const searchUrl = new URLSearchParams(search);
  const origin = searchUrl.get('origin');
  const sendParam = origin ?? 'from';
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      {isAuthenticated ? (
        <Stack spacing={8}>
          <SearchBar handleChange={handleChange} title={t('search.title_swap')} />
          <Box>
            {crypto.length > 0 ? (
              crypto.map((data) => (
                <ListCrypto
                  showSwitches={false}
                  key={data.CoinInfo.Id}
                  cryptocurrency={data}
                  showPriceCoins={false}
                  isCursorPointer
                  onClick={() =>
                    navigate(`${ROUTES.TRANSACTION_SWAP}?origin=${sendParam}`, {
                      state: {
                        crypto: data,
                        symbol: data.DISPLAY?.[currency]?.TOSYMBOL,
                      },
                    })
                  }
                />
              ))
            ) : (
              <EmptySearch />
            )}
          </Box>
        </Stack>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <InviteToLogin />
        </Flex>
      )}
    </>
  );
};
