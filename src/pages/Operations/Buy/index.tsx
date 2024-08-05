import { Stack, Box, Flex, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSearchCrypto } from '../../../hooks/useSearchCrypto';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES, SupportedCurrency } from '../../../constants';
import { InviteToLogin } from '../../../components/InviteToLogin';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';
import { useMemo } from 'react';
import { CryptoCompareData, WalletsIProps } from '../../../interfaces';
import { formatChange, formatCurrency } from '../../../utils';
import { useTranslation } from 'react-i18next';
import { EmptySearch } from '../../../components/EmptySearch';

export const BuyList = () => {
  const navigate = useNavigate();
  const { currency, currentCrypto } = useStoreCrypto();
  const { isAuthenticated, currentWallet } = useStoreAutheticated();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: false,
    allCrypto: currentCrypto,
  });
  const morePopuplar = ['BTC', 'ETH'];
  const filterMorePopuplar = currentCrypto.filter((crypto) =>
    morePopuplar.includes(crypto.CoinInfo.Name),
  );
  const BG_COLOR = useColorModeValue('gray.200', '#171717');
  const textColor = useColorModeValue('gray.700', 'gray.500');
  const { t } = useTranslation();

  const renderCryptoAmountAndValue = useMemo(() => {
    return (crypto: CryptoCompareData, currentWallet: WalletsIProps, currency: string) => {
      const symbol = crypto.DISPLAY?.[currency]?.TOSYMBOL;
      const amount = currentWallet?.cryptoCurrency[crypto.CoinInfo.Name] ?? 0;
      const price = parseFloat((crypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
      const totalValue = amount * price;

      return (
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold">
            {amount}
          </Text>
          <Text fontSize={'sm'} color="gray.500">
            {`${symbol ?? ''} ${formatCurrency(totalValue, currency as SupportedCurrency)}`}
          </Text>
        </Box>
      );
    };
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Stack spacing={6}>
          <SearchBar handleChange={handleChange} title={t('search.title_buy')} />
          <Box>
            <Text mb={2} textTransform={'capitalize'}>
              {t('search.popular')}
            </Text>
            <Flex justifyContent={'space-between'}>
              {filterMorePopuplar.map((data) => (
                <Flex
                  key={data.CoinInfo.Id}
                  cursor={'pointer'}
                  borderRadius={'md'}
                  p={2}
                  flex={1}
                  mr={4}
                  alignItems={'center'}
                  bg={BG_COLOR}
                  onClick={() => {
                    navigate(`${ROUTES.OPERATIONS_BUY_CRYPTO_WITH_GATEWAY}`, {
                      state: {
                        crypto: data,
                        symbol: data.DISPLAY?.[currency]?.TOSYMBOL,
                      },
                    });
                  }}
                >
                  <Image
                    boxSize="45px"
                    borderRadius="full"
                    mr={4}
                    src={`https://www.cryptocompare.com${data.CoinInfo.ImageUrl}`}
                    alt={data.CoinInfo.FullName}
                  />
                  <Box>
                    <Text fontSize={'medium'} textTransform={'uppercase'}>
                      {data.CoinInfo.Name}
                    </Text>
                    <Text color={'gray.500'} fontSize={'small'}>
                      {data.CoinInfo.FullName}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>

          <Box>
            <Box mb={3}>
              <Text textTransform={'capitalize'}>{t('search.all_crypto')}</Text>
            </Box>
            {crypto.length > 0 ? (
              crypto.map((data) => (
                <Flex
                  key={data.CoinInfo.Id}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                  py={1}
                  onClick={() => {
                    navigate(`${ROUTES.OPERATIONS_BUY_CRYPTO_WITH_GATEWAY}`, {
                      state: {
                        crypto: data,
                        symbol: data.DISPLAY?.[currency]?.TOSYMBOL,
                      },
                    });
                  }}
                  _hover={{ cursor: 'pointer', bg: BG_COLOR }}
                >
                  <Flex alignItems="center">
                    <Image
                      src={`https://www.cryptocompare.com${data.CoinInfo.ImageUrl}`}
                      alt={data.CoinInfo.Name}
                      boxSize={{ base: '42px', md: '50px' }}
                      borderRadius="full"
                      mr={3}
                    />
                    <Box>
                      <Text fontSize="md" fontWeight="bold" textTransform={'uppercase'}>
                        {data.CoinInfo.Name}
                      </Text>
                      <Flex flexWrap={'wrap'}>
                        <Text fontSize={'sm'} color={textColor}>
                          {data?.DISPLAY?.[currency]?.PRICE || 'N/A'}
                        </Text>
                        <Text
                          fontSize={'sm'}
                          color={
                            data?.RAW?.[currency]?.CHANGEPCT24HOUR >= 0 ? '#17ca56' : '#cf0c07'
                          }
                          ml={1}
                        >
                          {data?.RAW?.[currency]?.CHANGEPCT24HOUR
                            ? formatChange(data?.RAW?.[currency]?.CHANGEPCT24HOUR)
                            : ''}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  {renderCryptoAmountAndValue(data, currentWallet!, currency)}
                </Flex>
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
