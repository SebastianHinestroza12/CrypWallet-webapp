import { FC } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ListCryptocurrenciesProps } from '../../interfaces';

export const ListCryptocurrencies: FC<ListCryptocurrenciesProps> = ({ cryptocurrencies }) => {
  const formatChange = (change: number): string => {
    if (change > 0) {
      return `+${change.toFixed(2)}%`;
    } else {
      return `${change.toFixed(2)}%`;
    }
  };

  return (
    <Flex direction="column" width="100%">
      {cryptocurrencies.map((crypto) => (
        <Flex key={crypto.id} alignItems="center" justifyContent="space-between" mb={4}>
          <Flex alignItems="center">
            <Image src={crypto.image} alt={crypto.name} boxSize="40px" borderRadius="full" mr={4} />
            <Box>
              <Text fontSize="lg" fontWeight="bold" textTransform={'uppercase'}>
                {crypto.symbol}
              </Text>
              <Flex>
                <Text color="gray.500">${crypto.current_price}</Text>
                <Text
                  color={crypto.price_change_percentage_24h >= 0 ? 'green.500' : 'red.500'}
                  ml={1}
                >
                  {formatChange(crypto.price_change_percentage_24h)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="bold">
              {crypto.current_price}
            </Text>
            <Text fontSize={'sm'} color="gray.500">
              ${crypto.current_price}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
