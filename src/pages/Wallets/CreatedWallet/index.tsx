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
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { CreateWalletIProps } from '../../../types';
import { WalletServices } from '../../../services/wallet.service';
import { useStoreAutheticated } from '../../../stores/authentication';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const CreateWallet: React.FC = () => {
  const {
    authenticatedUser: { id },
    addWallet,
  } = useStoreAutheticated();
  const toast = useToast();
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
        toast({
          title: 'Wallet created successfully',
          description: 'El wallet ha sido creado correctamente.',
          status: 'success',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });

        //Agregar la nueva wallet al estado global
        addWallet(wallet);

        // Redireccionar a la página de listado de las wallet
        setTimeout(() => {
          navigation(ROUTES.WALLETS);
        }, 4000);
      }
    } catch (error) {
      toast({
        title: 'Error creating wallet',
        description: 'Hubo un problema al crear el wallet.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
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
      <Heading
        as="h2"
        size="lg"
        mb="6"
        textAlign="center"
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon icon={'ion:wallet-outline'} style={{ marginRight: '8px' }} />
        <Text>Creación de Wallet</Text>
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb="4">
          <FormLabel htmlFor="name" display={'flex'} alignItems={'center'}>
            <Icon icon={'clarity:form-line'} style={{ marginRight: '4px' }} />
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
