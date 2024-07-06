import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../stores/authentication';
import { WalletCardType } from '../../types';
import { WalletsIProps } from '../../interfaces';

export const WalletCard = ({
  name,
  walletId,
  handleChangeWallet,
  handleEditWallet,
}: WalletCardType) => {
  const { currentWallet } = useStoreAutheticated();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      position="relative"
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        onClick={() => handleChangeWallet({ id: walletId, name } as WalletsIProps)}
      >
        <Box position="relative" display="inline-block" mr={2}>
          <Icon icon="ion:wallet-outline" width="40" height="40" />
          {walletId === currentWallet?.id && (
            <Box
              position="absolute"
              top="-5px"
              right="-5px"
              bg="green.400"
              borderRadius="full"
              p="2px"
            >
              <Icon icon="mdi:check-bold" width="16" height="16" />
            </Box>
          )}
        </Box>
        <Text fontSize="lg">{name}</Text>
      </Box>
      <IconButton
        onClick={() => handleEditWallet(walletId, name)}
        aria-label="Options"
        icon={<Icon icon="mdi:dots-vertical" width="24" height="24" />}
        variant="ghost"
      />
    </Flex>
  );
};
