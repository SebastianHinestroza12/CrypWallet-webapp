import { useState, useEffect, memo } from 'react';
import { Box, Flex, Image, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { CryptoCompareData } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useSwitchStore } from '../../stores/switch';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { EmptyState } from '../../components/EmptyState';
import { ROUTES } from '../../constants';

export const ListCryptocurrencies = memo(() => {
  const { switchStates } = useSwitchStore();
  const { isDataVisible } = useStoreVisibilityData();
  const [showCrypto, setShowCrypto] = useState<CryptoCompareData[]>([]);
  const { currency, currentCrypto } = useStoreCrypto();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.700', 'gray.500');

  const formatChange = (change: number): string => {
    if (change > 0) {
      return `+${change?.toFixed(2)}%`;
    } else {
      return `${change?.toFixed(2)}%`;
    }
  };

  useEffect(() => {
    const convertObjectToArray = Object.entries(switchStates);
    const filteredCryptocurrencies = currentCrypto.filter((data) => {
      return convertObjectToArray.some((item) => {
        return item[0] === data.CoinInfo.FullName.toLowerCase() && item[1] === true;
      });
    });
    setShowCrypto(filteredCryptocurrencies);
  }, [switchStates, currency, currentCrypto]);

  return (
    <Flex direction="column" width="100%">
      {showCrypto.length === 0 ? (
        <EmptyState />
      ) : (
        showCrypto.map((crypto) => (
          <Flex
            key={crypto.CoinInfo.Id}
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            py={1}
            onClick={() =>
              navigate(`${ROUTES.CRYPTO_DETAIL_MAIN}/${crypto.CoinInfo.FullName.toLowerCase()}`)
            }
            _hover={{ cursor: 'pointer' }}
          >
            <Flex alignItems="center">
              <Image
                src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
                alt={crypto.CoinInfo.Name}
                boxSize="45px"
                borderRadius="full"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold" textTransform={'uppercase'}>
                  {crypto.CoinInfo.Name}
                </Text>
                <Flex>
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
              <Box textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  {crypto.CoinInfo.BlockTime}
                </Text>
                <Text fontSize={'sm'} color="gray.500">
                  ${crypto.CoinInfo.BlockNumber}
                </Text>
              </Box>
            ) : (
              <Icon boxSize={12} as={PiDotsThreeOutlineFill} />
            )}
          </Flex>
        ))
      )}
    </Flex>
  );
});
