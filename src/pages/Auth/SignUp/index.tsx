import { useState } from 'react';
import { Flex, Box, Stack, Heading, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { DataRegisterProps } from '../../../interfaces';
import { AxiosError } from 'axios';
import { RegistrationForm } from '../../../components/RegistrationForm';
import { SecurityWordsModal } from '../../../components/SecurityWordsModal';
import { AuthService } from '../../../services/auth.service';
import { useToastNotification } from '../../../hooks/useToastNotification';

export const UserRegistrationForm = () => {
  const { displayToast } = useToastNotification();
  const [dataUser, setDataUser] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const BG = useColorModeValue('#FFF', '#171717');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    const formData = values as DataRegisterProps;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status, data } = await AuthService.registerUser(formData);
      if (status === 201) {
        displayToast('Registro exitoso', `¡Bienvenido ${formData.name}!`, 'success');
        setDataUser(data.safeWords);
        onOpen();
      }
    } catch (error) {
      const serverError = error as AxiosError;
      if (serverError.code === 'ERR_NETWORK') {
        displayToast(
          'Error del Servidor',
          'Por favor, inténtalo de nuevo más tarde.',
          'error',
          7000,
        );
        return;
      }
      const status = serverError.response?.status;
      if (status === 409) {
        displayToast(
          'Error de registro',
          'Ya existe un usuario con esta dirección de correo.',
          'error',
          7000,
        );
      } else {
        displayToast(
          'Error del Servidor',
          'Por favor, inténtalo de nuevo más tarde.',
          'error',
          7000,
        );
      }
    }
  };

  return (
    <Flex align={'center'} justify={'center'} flexDirection={'column'} pb={4}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Regístrate
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={BG} boxShadow={'2xl'} p={8}>
          <RegistrationForm
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            handleRegister={handleRegister}
          />
        </Box>
        {dataUser.length > 0 && (
          <SecurityWordsModal isOpen={isOpen} onClose={onClose} dataUser={dataUser} bg={BG} />
        )}
      </Stack>
    </Flex>
  );
};
