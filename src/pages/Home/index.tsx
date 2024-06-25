import { FC } from 'react';
import { Layout } from '../../components/Layout';
import { Flex, Stack } from '@chakra-ui/react';
import { TotalCash } from '../../components/TotalCash';
import { OperationButton } from '../../components/OperationButton';
import { ListCryptocurrencies } from '../../components/ListCryptocurrencies';
import { OPERATION_BUTTONS, CRYPTOCURRENCYS } from '../../constants';

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
      </Stack>
    </Layout>
  );
};
