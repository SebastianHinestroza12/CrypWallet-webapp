import { FC, useState } from 'react';
import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { TotalCash } from '../../components/TotalCash';
import { OperationButton } from '../../components/OperationButton';
import { ListCryptocurrencies } from '../../components/ListCryptocurrencies';
import { OPERATION_BUTTONS } from '../../constants';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { Link } from 'react-router-dom';
import { fetchCryptoCompareData } from '../../utils';

export const Home: FC = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const { currency, setCurrentCrypto } = useStoreCrypto();
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await fetchCryptoCompareData(currency);
      setCurrentCrypto(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack px={2} spacing={5}>
      <TotalCash
        amount="$241.324"
        isPositive
        percentage="5.57%"
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      <Flex justifyContent="space-between">
        {OPERATION_BUTTONS.map((button) => (
          <OperationButton key={button.text} icon={button.icon} text={button.text} />
        ))}
      </Flex>
      <ListCryptocurrencies />
      <Box mb={3} py={2} _hover={{ bg: BG_COLOR }}>
        <Link to={'/crypto/manage'}>
          <Text
            _hover={{ cursor: 'pointer', color: '#007bff' }}
            color={'#1e59ea'}
            fontSize={'md'}
            textAlign={'center'}
          >
            Manage cryptocurrencies
          </Text>
        </Link>
      </Box>
    </Stack>
  );
};
