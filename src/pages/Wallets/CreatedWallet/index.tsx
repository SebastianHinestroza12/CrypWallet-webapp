import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Text,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { CreateWalletIProps } from '../../../types';
import { WalletServices } from '../../../services/wallet.service';
import { useStoreAutheticated } from '../../../stores/authentication';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { useToastNotification } from '../../../hooks/useToastNotification';

export const CreateWallet: React.FC = () => {
  const {
    authenticatedUser: { id },
    addWallet,
  } = useStoreAutheticated();
  const { displayToast } = useToastNotification();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateWalletIProps>();

  const onSubmit: SubmitHandler<CreateWalletIProps> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const {
        status,
        data: { wallet },
      } = await WalletServices.createWallet(data, id!);

      if (status === 201) {
        //Mensaje de exitó
        displayToast(
          'Wallet created successfully',
          'El wallet ha sido creado correctamente.',
          'success',
          2000,
        );
        //Agregar la nueva wallet al estado global
        addWallet(wallet);

        // Redireccionar a la página de listado de las wallet
        setTimeout(() => {
          navigation(ROUTES.WALLETS);
        }, 2000);
      }
    } catch (error) {
      displayToast('Error creating wallet', 'Hubo un problema al crear el wallet.', 'error');
    }
  };

  return (
    <Box
      width="100%"
      maxWidth="400px"
      mx="auto"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Creación de Wallet</Heading>
        <IconButton
          icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
          variant="outline"
          aria-label="Go back"
          onClick={() => navigation(-1)}
        />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb="4">
          <FormLabel htmlFor="name" display={'flex'} alignItems={'center'}>
            <Text>Wallet Name</Text>
          </FormLabel>
          <Input
            id="name"
            placeholder="Enter wallet name"
            {...register('name', { required: 'Wallet name is required' })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          bg={'#1e59ea'}
          _hover={{ bg: '#007bff', cursor: 'pointer' }}
          type="submit"
          width="full"
          isLoading={isSubmitting}
        >
          <Icon icon="mdi:wallet-plus" style={{ marginRight: '8px' }} color="#FFF" />
          <Text color={'#FFF'}>Create Wallet</Text>
        </Button>
      </form>
    </Box>
  );
};
