import { FC, useState, memo, useLayoutEffect } from 'react';
import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { ListCryptocurrenciesProps, CryptoData } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useSwitchStore } from '../../stores/switch';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { formatCurrency } from '../../utils';

export const ListCryptocurrencies: FC<ListCryptocurrenciesProps> = memo(({ cryptocurrencies }) => {
  const { switchStates } = useSwitchStore();
  const { isDataVisible } = useStoreVisibilityData();
  const [showCrypto, setShowCrypto] = useState<CryptoData[]>([]);
  const navigate = useNavigate();

  const formatChange = (change: number): string => {
    if (change > 0) {
      return `+${change.toFixed(2)}%`;
    } else {
      return `${change.toFixed(2)}%`;
    }
  };

  useLayoutEffect(() => {
    const convertObjectToArray = Object.entries(switchStates);
    const filteredCryptocurrencies = cryptocurrencies.filter((data) => {
      return convertObjectToArray.some((item) => {
        return item[0] === data.id && item[1] === true;
      });
    });
    setShowCrypto(filteredCryptocurrencies);
  }, [cryptocurrencies, switchStates]);

  return (
    <Flex direction="column" width="100%">
      {showCrypto.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          Sin crypto Para Visualizar
        </Text>
      ) : (
        showCrypto.map((crypto) => (
          <Flex
            key={crypto.id}
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            py={1}
            onClick={() => navigate(`/crypto/detail/${crypto.id}`)}
            _hover={{ cursor: 'pointer' }}
          >
            <Flex alignItems="center">
              <Image
                src={crypto.image}
                alt={crypto.name}
                boxSize="40px"
                borderRadius="full"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold" textTransform={'uppercase'}>
                  {crypto.symbol}
                </Text>
                <Flex>
                  <Text color="gray.500">{formatCurrency(crypto.current_price, 'USD')}</Text>
                  <Text
                    color={crypto.price_change_percentage_24h >= 0 ? 'green.500' : 'red.500'}
                    ml={1}
                  >
                    {formatChange(crypto.price_change_percentage_24h)}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            {isDataVisible ? (
              <Box textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  {crypto.current_price}
                </Text>
                <Text fontSize={'sm'} color="gray.500">
                  ${crypto.current_price}
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
