/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Input,
  Button,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { WalletServices } from '../../../services/wallet.service';

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
  const toast = useToast();

  useEffect(() => {
    const findWallet = wallets.find((wallet) => wallet.id === state.walletId);
    if (findWallet) setAddress(findWallet.address);
  }, []);

  const onSubmit = async (data: { name: string }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status } = await WalletServices.updateWallet(state.walletId, data);

      if (status === 200) {
        toast({
          title: 'Wallet updated.',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });

        // Actualizar el store
        updateWallet(state.walletId, data.name);

        setTimeout(() => navigation(ROUTES.WALLETS), 2000);
      }
    } catch (error) {
      toast({
        title: 'Error updating wallet.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      if (currentWallet?.id === state.walletId) {
        toast({
          title: 'Cannot delete current wallet.',
          status: 'info',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });

        setIsLoading(false);
        return;
      }

      // Esperar 2 segundos para simular la solicitud de API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status } = await WalletServices.deleteWallet(state.walletId, id!);

      setIsLoading(false);

      if (status === 200) {
        toast({
          title: 'Wallet deleted.',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });

        // Actualizar el store
        deleteWallet(state.walletId);

        setTimeout(() => navigation(ROUTES.WALLETS), 2000);
      }
    } catch (error) {
      toast({
        title: 'Error deleting wallet.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });

      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: 'Address copied to clipboard.',
      status: 'success',
      duration: 3000,
      position: 'top-right',
      isClosable: true,
    });
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
