/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  FormErrorMessage,
  Box,
  FormControl,
  Text,
  Input,
  Stack,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { NumericKeypad } from '../../../components/NumericKeypad';
import { loginUser } from '../../../services/authService';
import './shake.css';

export const UserLogIn: React.FC = () => {
  const navigation = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [borderColorPin, setBorderColorPin] = useState('#1e59ea');
  const [shake, setShake] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  const email = watch('email');

  const handleNumberClick = (num: number) => {
    setPin((prevPin) => {
      const newPin = prevPin + num.toString();
      if (newPin.length === 6) {
        handleLoginAttempt(newPin);
      } else {
        setBorderColorPin('#1e59ea');
      }
      return newPin.length <= 6 ? newPin : prevPin;
    });
  };

  const handleLoginAttempt = async (pin: string) => {
    try {
      const { status } = await loginUser({ email, password: pin });

      if (status === 200) {
        setBorderColorPin('green');
        setTimeout(() => {
          navigation('/home');
        }, 2000);
      }
    } catch (error: any) {
      //Server Off
      if (error.code === 'ERR_NETWORK') {
        setPin('');
        return toast({
          title: 'Error del Servidor',
          description: 'Por favor, inténtalo de nuevo más tarde.',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }

      const { status } = error.response;

      //Incorrect password
      if (status === 401) {
        setBorderColorPin('red');
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setBorderColorPin('#1e59ea');
        }, 1000);
        setPin('');
      } else {
        //User not found
        toast({
          title: 'Error de autenticación',
          description:
            'El usuario no se encuentra registrado. Por favor verifica tu información e inténtalo de nuevo.',
          status: 'error',
          duration: 7000,
          isClosable: true,
          position: 'top-right',
        });
        setPin('');
      }
    }
  };

  useEffect(() => {
    if (!isValid) {
      setPin('');
    }
  }, [email, isValid]);

  const handleDeleteClick = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
    setBorderColorPin('#1e59ea');
  };

  const handleFingerprintClick = () => {
    console.log('Fingerprint clicked');
  };

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} mx={'auto'} maxW={'lg'} m={2}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Iniciar Sesión
            </Heading>
            <FormControl isInvalid={!!errors.email} isRequired>
              <Input
                autoFocus
                type="email"
                id="email"
                placeholder="Ingrese correo electrónico"
                {...register('email', {
                  required: 'Email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'No es un correo electrónico válido',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && typeof errors.email.message === 'string' ? (
                  <span>{errors.email.message}</span>
                ) : null}
              </FormErrorMessage>
            </FormControl>
            <Text align={'center'}>Ingrese el código de acceso</Text>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput
                    type="number"
                    size={'lg'}
                    value={pin}
                    onChange={setPin}
                    colorScheme="blue"
                    isDisabled={!isValid}
                    mask
                    onComplete={() => console.log('Dios es bueno')}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField
                        key={index}
                        readOnly
                        style={{ borderColor: borderColorPin }}
                        className={shake ? 'shake' : ''}
                      />
                    ))}
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Text textAlign={'center'} color={'gray.600'}>
              El código de acceso añade una capa adicional de seguridad al usar la aplicación.
            </Text>
            <Box>
              <NumericKeypad
                onNumberClick={handleNumberClick}
                onDeleteClick={handleDeleteClick}
                onFingerprintClick={handleFingerprintClick}
                isDisabled={!isValid}
              />
            </Box>
            <Stack pt={6}>
              <Text align={'center'}>
                <Link className="text-[#1e59ea]" to="#">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Text>
              <Text align={'center'}>
                ¿No tienes cuenta?{' '}
                <Link className="text-[#1e59ea]" to="/auth/user-signup">
                  Crea una cuenta
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
