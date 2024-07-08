import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { AuthService } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { useToastNotification } from '../../hooks/useToastNotification';
import { useStoreAutheticated } from '../../stores/authentication';

type FormData = {
  email: string;
};

export const VerifyAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const { displayToast } = useToastNotification();
  const { setRecoveryStep, setRecoreyProgress, setUserIdRecoveryAccount } = useStoreAutheticated();
  const bg = useColorModeValue('gray.100', '#171717');

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate delay for 2 seconds before sending verification code
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const {
        status,
        data: { userId },
      } = await AuthService.generateOTP(data);

      if (status === 200) {
        displayToast(
          'Éxito',
          'Código de verificación enviado a tu correo electrónico.',
          'success',
          3000,
        );

        setTimeout(() => {
          setUserIdRecoveryAccount(userId);
          setRecoreyProgress(50);
          setRecoveryStep(2);
        }, 3000);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ERR_NETWORK') {
        displayToast('Error del Servidor', 'Por favor, inténtalo de nuevo más tarde.', 'error');
        return;
      }

      const { response } = axiosError;
      if (response?.status === 404) {
        displayToast(
          'Error',
          'No se encontró una cuenta asociada con este correo electrónico.',
          'error',
        );
        return;
      }

      displayToast('Error', 'Hubo un problema al generar el código de verificación.', 'error');
    }
  };

  return (
    <Flex align="center">
      <Stack spacing={4} bg={bg} rounded="xl" boxShadow="2xl" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Verificación de tu cuenta
        </Heading>

        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Ingresa tu correo electrónico para comprobar si tienes una cuenta existente.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <Input
              autoFocus
              placeholder="your-correo@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              {...register('email', {
                required: 'Correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Stack mt={5}>
            <Button
              rounded={'full'}
              type="submit"
              isLoading={isSubmitting}
              bg={'#1E59EA'}
              _hover={{ bg: '#007bff' }}
              color="white"
              isDisabled={!isValid}
            >
              Verificar cuenta
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
