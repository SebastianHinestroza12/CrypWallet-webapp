import { Fragment } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { WalletCard } from '../../components/WalletCard';

const wallets = [{ name: 'Wallet 1' }, { name: 'Wallet 2' }, { name: 'Wallet 3' }];

export const Wallets = () => {
  return (
    <Box px={4}>
      <Heading mb={5} textAlign={'center'}>
        WALLETS
      </Heading>
      <Text fontSize="lg" color="gray.500" mb={4}>
        MULTI-COIN WALLET
      </Text>
      {wallets.map((wallet) => (
        <Fragment key={wallet.name}>
          <WalletCard name={wallet.name} />
        </Fragment>
      ))}
    </Box>
  );
};
