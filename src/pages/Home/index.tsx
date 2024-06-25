import { FC } from 'react';
import { Layout } from '../../components/Layout';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { TotalCash } from '../../components/TotalCash';
import { OperationButton } from '../../components/OperationButton';
import { ListCryptocurrencies } from '../../components/ListCryptocurrencies';
import { OPERATION_BUTTONS, CRYPTOCURRENCYS } from '../../constants';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <Layout>
      <Stack px={2} spacing={5}>
        <TotalCash amount="$241.324" isPositive percentage="5.57%" />
        <Flex justifyContent="space-between">
          {OPERATION_BUTTONS.map((button) => (
            <OperationButton key={button.text} icon={button.icon} text={button.text} />
          ))}
        </Flex>
        <ListCryptocurrencies cryptocurrencies={CRYPTOCURRENCYS} />
        <Box mb={5}>
          <Link to={'/crypto/manage'}>
            <Text
              _hover={{ transform: 'scale(1.1)', cursor: 'pointer', color: '#007bff' }}
              color={'#1e59ea'}
              fontSize={'md'}
              textAlign={'center'}
            >
              Manage cryptocurrencies
            </Text>
          </Link>
        </Box>
      </Stack>
    </Layout>
  );
};
