/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Stack, Box, Flex } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { ListCrypto } from '../../../components/ListCrypto';
import { useNavigate } from 'react-router-dom';
import { useSearchCrypto } from '../../../hooks/useSearchCrypto';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { InviteToLogin } from '../../../components/InviteToLogin';
import { CryptoCompareData } from '../../../interfaces';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';
import { useTranslation } from 'react-i18next';
import { EmptySearch } from '../../../components/EmptySearch';

export const SendList = () => {
  const { currency, currentCrypto } = useStoreCrypto();
  const { isAuthenticated, currentWallet } = useStoreAutheticated();
  const [cryptoWithCoin, setCryptoWithCoin] = useState<CryptoCompareData[]>([]);
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: false,
    allCrypto: cryptoWithCoin,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      const filterWithCoin = currentCrypto.filter(
        (coin) => currentWallet?.cryptoCurrency[coin.CoinInfo.Name],
      );
      setCryptoWithCoin(filterWithCoin);
    }
  }, []);

  const calculateMounters = (coin: CryptoCompareData) => {
    const coinValue = currentWallet?.cryptoCurrency[coin.CoinInfo.Name];
    const totalValue = coinValue! * parseFloat((coin.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
    return totalValue;
  };

  return (
    <>
      {isAuthenticated ? (
        <Stack spacing={8}>
          <SearchBar handleChange={handleChange} title={t('search.title_send')} />
          <Box>
            {crypto.length > 0 ? (
              crypto.map((data) => (
                <ListCrypto
                  showSwitches={false}
                  key={data.CoinInfo.Id}
                  cryptocurrency={data}
                  showPriceCoins
                  symbol={data.DISPLAY?.[currency]?.TOSYMBOL}
                  coin={currentWallet?.cryptoCurrency[data.CoinInfo.Name]}
                  priceCoin={calculateMounters(data)}
                  isCursorPointer
                  onClick={() =>
                    navigate(`${ROUTES.OPERATIONS_SEND_TRANSFER_CRYPTO}`, {
                      state: {
                        crypto: data,
                        maxAmount: calculateMounters(data),
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
