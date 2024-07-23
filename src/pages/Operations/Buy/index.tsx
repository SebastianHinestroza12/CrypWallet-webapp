import { Stack, Box, Flex } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { ListCrypto } from '../../../components/ListCrypto';
import { useNavigate } from 'react-router-dom';
import { useSearchCrypto } from '../../../hooks/useSearchCrypto';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { InviteToLogin } from '../../../components/InviteToLogin';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';

export const BuyList = () => {
  const { currency, currentCrypto } = useStoreCrypto();
  const { isAuthenticated } = useStoreAutheticated();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: false,
    allCrypto: currentCrypto,
  });
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated ? (
        <Stack spacing={8}>
          <SearchBar handleChange={handleChange} title="buy crypto" />
          <Box>
            {crypto.map((data) => (
              <ListCrypto
                showSwitches={false}
                key={data.CoinInfo.Id}
                cryptocurrency={data}
                showPriceCoins={false}
                isCursorPointer
                onClick={() =>
                  navigate(`${ROUTES.PAYMENT_METHODS_CRYPTO}`, {
                    state: {
                      crypto: data,
                      symbol: data.DISPLAY?.[currency]?.TOSYMBOL,
                    },
                  })
                }
              />
            ))}
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
