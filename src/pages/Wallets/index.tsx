import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { WalletCard } from '../../components/WalletCard';
import { useStoreAutheticated } from '../../stores/authentication';
import { Icon } from '@iconify/react';
import { WalletsIProps } from '../../interfaces';

export const Wallets = () => {
  const {
    wallets,
    authenticatedUser: { id },
    currentWallet,
    setCurrentWallet,
  } = useStoreAutheticated();

  const handleChangeWallet = (wallet: WalletsIProps) => {
    if (currentWallet !== null && currentWallet.id !== wallet.id) {
      setCurrentWallet(wallet, id!);
    }
  };

  return (
    <Stack px={3} spacing={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading textAlign={'center'}>Wallets</Heading>
        <Box>
          <Icon icon="carbon:add-filled" width={35} height={35} />
        </Box>
      </Flex>
      <Text fontSize="lg" color="gray.500">
        MULTI-COIN WALLET
      </Text>
      <Box>
        {wallets.map((wallet) => (
          <Box key={wallet.id} onClick={() => handleChangeWallet(wallet)}>
            <WalletCard name={wallet.name} walletId={wallet.id} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};
