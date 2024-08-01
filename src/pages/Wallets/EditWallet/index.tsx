/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Stack, Input, Button, IconButton, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { WalletServices } from '../../../services/wallet.service';
import { useToastNotification } from '../../../hooks/useToastNotification';

export const EditWallet = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const {
    authenticatedUser: { id },
    currentWallet,
    updateWallet,
    deleteWallet,
    wallets,
  } = useStoreAutheticated();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: state.name as string },
  });
  const { displayToast } = useToastNotification();

  useEffect(() => {
    const findWallet = wallets.find((wallet) => wallet.id === state.walletId);
    if (findWallet) setAddress(findWallet.address);
  }, []);

  const onSubmit = async (data: { name: string }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status } = await WalletServices.updateWallet(state.walletId, data);

      if (status === 200) {
        displayToast('Wallet updated.', '', 'success', 2000);

        // Actualizar el store
        updateWallet(state.walletId, data.name);

        setTimeout(() => navigation(ROUTES.WALLETS), 2000);
      }
    } catch (error) {
      displayToast('Error creating wallet', '', 'error', 3000);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      if (currentWallet?.id === state.walletId) {
        displayToast('No puedes eliminar la wallet actual.', '', 'info', 3000);
        setIsLoading(false);
        return;
      }

      // Esperar 2 segundos para simular la solicitud de API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status } = await WalletServices.deleteWallet(state.walletId, id!);

      setIsLoading(false);

      if (status === 200) {
        displayToast('Wallet deleted.', '', 'success', 2000);
        // Actualizar el store
        deleteWallet(state.walletId);

        setTimeout(() => navigation(ROUTES.WALLETS), 2000);
      }
    } catch (error) {
      displayToast('Error deleting wallet.', '', 'error', 1500);
      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    displayToast('Address copied to clipboard.', '', 'success', 1000);
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Edit Wallet</Heading>
        <IconButton
          icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
          variant="outline"
          aria-label="Go back"
          onClick={() => navigation(-1)}
        />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Box>
            <Text mb={2}>Wallet Name</Text>
            <Input
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter wallet name"
            />
            {errors.name && (
              <Text color="red.500" fontSize="sm">
                {errors.name.message}
              </Text>
            )}
          </Box>
          <Box>
            <Text mb={2}>Wallet Address</Text>
            <Flex alignItems="center">
              <Input value={address} isReadOnly placeholder="Wallet address" />
              <IconButton
                icon={<Icon icon="mdi:content-copy" width="24" height="24" />}
                onClick={handleCopyAddress}
                aria-label="Copy address"
                ml={2}
              />
            </Flex>
          </Box>
          <Flex justifyContent="space-between">
            <Button
              bg={'#1e59ea'}
              _hover={{ bg: '#007bff' }}
              color={'#FFF'}
              leftIcon={<Icon icon="mdi:content-save" width={24} height={24} />}
              type="submit"
              isLoading={isSubmitting}
            >
              Save
            </Button>
            <Button
              leftIcon={<Icon icon="mdi:delete" width={24} height={24} />}
              bg={'#E53E3E'}
              color={'#FFF'}
              _hover={{ bg: '#C43030' }}
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
