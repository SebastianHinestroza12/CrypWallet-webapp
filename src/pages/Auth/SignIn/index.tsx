import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { NumericKeypad } from '../../../components/NumericKeypad';
import { Logo } from '../../../components/Logo';

export const UserLogIn: React.FC = () => {
  const [isBreakpointReady, setIsBreakpointReady] = useState(false);
  const showLogo = useBreakpointValue({ base: false, md: true });
  const [pin, setPin] = useState<string>('');
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  const handleNumberClick = (num: number) => {
    if (pin.length < 6) {
      setPin((prevPin) => prevPin + num.toString());
    }
  };

  const email = watch('email');

  useEffect(() => {
    if (!isValid) {
      setPin('');
    }
  }, [email, isValid]);

  useEffect(() => {
    setIsBreakpointReady(true);
  }, []);

  const handleDeleteClick = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleFingerprintClick = () => {
    console.log('Fingerprint clicked');
  };

  return (
    <Flex minH={'100vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} mx={'auto'} maxW={'lg'} py={4} m={3}>
        <Box>
          <Stack spacing={4}>
            {isBreakpointReady && showLogo && (
              <Center>
                <Logo size="67%" styles="d-flex items-center justify-center" withLetters />
              </Center>
            )}
            <FormControl isInvalid={!!errors.email} isRequired>
              <Input
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
                  <PinInput size={'lg'} value={pin} onChange={setPin}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField key={index} type="password" readOnly />
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
                <Link className="text-[#1e59ea]" to="#">
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
