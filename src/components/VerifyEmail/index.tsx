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
  Box,
} from '@chakra-ui/react';
import { Logo } from '../Logo';

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

  const onSubmit = (data: FormData) => {
    console.log('Verificar cuenta para:', data.email);
  };

  return (
    <Flex p={4} minH="100vh" align="center" flexDirection={'column'}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Social Handles
      </Heading>
      <Box mb={4}>
        <Logo size="67%" styles="d-flex items-center justify-center" withLetters />
      </Box>
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        boxShadow="2xl"
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Verifica tu cuenta
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Ingresa tu correo electrónico para comprobar si tienes una cuenta existente.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <Input
              autoFocus
              placeholder="tu-correo@example.com"
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
          <Stack spacing={6} mt={4}>
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
