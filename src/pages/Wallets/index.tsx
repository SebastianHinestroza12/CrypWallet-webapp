import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { WalletCard } from '../../components/WalletCard';
import { useStoreAutheticated } from '../../stores/authentication';
import { Icon } from '@iconify/react';
import { WalletsIProps } from '../../interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';

export const Wallets = () => {
  const navigation = useNavigate();
  const {
    wallets,
    authenticatedUser: { id },
    currentWallet,
    setCurrentWallet,
  } = useStoreAutheticated();
  const { t } = useTranslation();

  const handleChangeWallet = (wallet: WalletsIProps) => {
    if (currentWallet !== null && currentWallet.id !== wallet.id) {
      setCurrentWallet(wallet, id!);
    }
  };

  const handleEditWallet = (walletId: string, name: string): void => {
    navigation(ROUTES.EDIT_WALLET, { state: { walletId, name } });
  };

  return (
    <Stack spacing={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading textAlign={'center'}>{t('wallet_page.wallet_list.title')}</Heading>
        <Box>
          <Link to={ROUTES.CREATE_WALLET}>
            <Icon icon="carbon:add-filled" width={35} height={35} />
          </Link>
        </Box>
      </Flex>
      <Text fontSize="lg" color="gray.500" textTransform={'uppercase'}>
        {t('wallet_page.wallet_list.description')}
      </Text>
      <Box>
        {wallets.map((wallet) => (
          <Box key={wallet.id}>
            <WalletCard
              name={wallet.name}
              walletId={wallet.id}
              handleChangeWallet={() => handleChangeWallet(wallet)}
              handleEditWallet={() => handleEditWallet(wallet.id, wallet.name)}
            />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};
