/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useLayoutEffect } from 'react';
import { Box, Flex, Image, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { CryptoCompareData, WalletsIProps } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useSwitchStore } from '../../stores/switch';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { EmptyState } from '../../components/EmptyState';
import { ROUTES, SupportedCurrency } from '../../constants';
import { useStoreAutheticated } from '../../stores/authentication';
import { formatCurrency, formatChange } from '../../utils';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

export const ListCryptocurrencies = () => {
  const { switchStates } = useSwitchStore();
  const { isDataVisible, setTotalCash, setSymbol, setTotalPercentaje, setIsPositive } =
    useStoreVisibilityData();
  const [showCrypto, setShowCrypto] = useState<CryptoCompareData[]>([]);
  const { currency, currentCrypto } = useStoreCrypto();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.700', 'gray.500');
  const { currentWallet, isAuthenticated } = useStoreAutheticated();

  useLayoutEffect(() => {
    if (!currentCrypto.length || !Object.keys(switchStates).length) {
      return;
    }

    const convertObjectToArray = Object.entries(switchStates);
    const filteredCryptocurrencies = currentCrypto.filter((data) => {
      return convertObjectToArray.some((item) => {
        return item[0] === data.CoinInfo.Name && item[1] === true;
      });
    });
    setShowCrypto(filteredCryptocurrencies);
  }, [switchStates, currentCrypto]);

  useLayoutEffect(() => {
    if (!isAuthenticated || !showCrypto.length) {
      return;
    }

    let accumulatedValue = 0;
    let totalPercentage = 0;

    showCrypto.forEach((crypto) => {
      const percentaje24Hour = crypto.RAW?.[currency]?.CHANGEPCT24HOUR;
      const amount = currentWallet?.cryptoCurrency[crypto.CoinInfo.Name];
      const price = parseFloat((crypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
      if (amount) {
        accumulatedValue += amount * price;
        totalPercentage += percentaje24Hour ?? 0;
      }
    });

    // Actualizacion de estados globales
    setTotalCash(accumulatedValue);
    setSymbol(showCrypto[0]?.DISPLAY?.[currency]?.TOSYMBOL);
    setTotalPercentaje(totalPercentage);
    setIsPositive(totalPercentage >= 0);
  }, [currency, currentWallet?.cryptoCurrency, showCrypto]);

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

  if (showCrypto.length === 0) {
    return <EmptyState />;
  }

  return (
    <Flex direction="column" width="100%">
      {showCrypto.map((crypto, index) => (
        <MotionFlex
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
          key={crypto.CoinInfo.Id}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          py={1}
          onClick={() =>
            navigate(`${ROUTES.CRYPTO_DETAIL_MAIN}/${crypto.CoinInfo.FullName.toLowerCase()}`, {
              state: { infoCrypto: crypto },
            })
          }
          _hover={{ cursor: 'pointer' }}
        >
          <Flex alignItems="center">
            <Image
              src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
              alt={crypto.CoinInfo.Name}
              boxSize={{ base: '42px', md: '50px' }}
              borderRadius="full"
              mr={4}
            />
            <Box>
              <Text fontSize="md" fontWeight="bold" textTransform={'uppercase'}>
                {crypto.CoinInfo.Name}
              </Text>
              <Flex flexWrap={'wrap'}>
                <Text color={bgColor}>{crypto?.DISPLAY?.[currency]?.PRICE || 'N/A'}</Text>
                <Text
                  color={crypto?.RAW?.[currency]?.CHANGEPCT24HOUR >= 0 ? '#17ca56' : '#cf0c07'}
                  ml={1}
                >
                  {crypto?.RAW?.[currency]?.CHANGEPCT24HOUR
                    ? formatChange(crypto?.RAW?.[currency]?.CHANGEPCT24HOUR)
                    : ''}
                </Text>
              </Flex>
            </Box>
          </Flex>
          {isDataVisible ? (
            renderCryptoAmountAndValue(crypto, currentWallet!, currency)
          ) : (
            <Icon boxSize={9} as={BiDotsHorizontalRounded} />
          )}
        </MotionFlex>
      ))}
    </Flex>
  );
};
