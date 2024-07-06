import { useState } from 'react';
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
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useStoreAutheticated } from '../../../stores/authentication';
import { ROUTES } from '../../../constants';
import { WalletServices } from '../../../services/wallet.service';

export const EditWallet = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    authenticatedUser: { id },
    currentWallet,
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

      // Wait for 2 seconds to simulate API request
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

  return (
    <Box p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Edit Wallet</Heading>
        <Link to={ROUTES.WALLETS}>
          <IconButton
            aria-label="Cancel"
            icon={<Icon icon="mdi:close" width={24} height={24} />}
            variant="ghost"
          />
        </Link>
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
          <Flex justifyContent="space-between">
            <Button
              leftIcon={<Icon icon="mdi:content-save" width={24} height={24} />}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Save
            </Button>
            <Button
              leftIcon={<Icon icon="mdi:delete" width={24} height={24} />}
              colorScheme="red"
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
