import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import { instanceAxios } from '../../../utils';
import { Logo } from '../../../components/Logo';

export const UserRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    // handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const handleRegister: SubmitHandler<FieldValues> = async (values) => {
  //   const data = values as any;
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     const createdUser = await instanceAxios.post('/auth/register', data);

  //     if (createdUser.status === 201) {
  //       alert('Dios es bueno');
  //     }
  //   } catch (error: any) {
  //     //Servidor Apagado
  //     if (error.code === 'ERR_NETWORK') {
  //       alert('Dios es bueno');
  //     }

  //     const { status, data } = error.response;

  //     if (status === 409 && data.error.includes('username')) {
  //       alert('Dios es bueno');
  //     } else if (status === 409 && data.error.includes('email')) {
  //       alert('Dios es bueno');
  //     } else {
  //       alert('Dios es bueno');
  //     }
  //   }
  // };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} flexDirection={'column'}>
      <Box>
        <Logo size="67%" styles="d-flex items-center justify-center" withLetters />
      </Box>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Registrate
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Para disfrutar de todas nuestras funciones interesantes ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('write', 'gray.800')} boxShadow={'2xl'} p={8}>
          <form>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.userName} id="email" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  id="userName"
                  {...register('userName', {
                    required: 'Nombre de usuario es obligatorio',
                    minLength: {
                      value: 3,
                      message: 'Minimo 3 caracteres',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Maximo 20 caracteres',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.userName && typeof errors.userName.message === 'string' ? (
                    <span>{errors.userName.message}</span>
                  ) : null}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email} id="email" isRequired>
                <FormLabel>Correo electronico</FormLabel>
                <Input
                  type="email"
                  id="email"
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
              <FormControl isInvalid={!!errors.password} id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Contraseña es requerida',
                      minLength: {
                        value: 8,
                        message: 'La contraseña debe tener al menos 8 caracteres',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        message:
                          'La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial',
                      },
                    })}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && typeof errors.password.message === 'string' ? (
                    <span>{errors.password.message}</span>
                  ) : null}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isSubmitting}
                  size="lg"
                  type="submit"
                  bg={'black'}
                  color={'white'}
                  _hover={{
                    bg: 'gray.900',
                  }}
                >
                  Registrarme
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  ¿Ya eres usuario?{' '}
                  <Link to={'/auth/login'} color={'blue.400'}>
                    <Text as="b"> Inicia sesión</Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
