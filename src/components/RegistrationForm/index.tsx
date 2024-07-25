/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, FC } from 'react';
import { UseFormRegister, FieldErrors, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface RegistrationFormProps {
  handleSubmit: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
  handleRegister: SubmitHandler<FieldValues>;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  handleRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} id="name" isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
              maxLength: {
                value: 20,
                message: 'Máximo 20 caracteres',
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                message: 'Solo se permiten letras y no se permiten espacios en blanco.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && typeof errors.name.message === 'string' ? (
              <span>{errors.name.message}</span>
            ) : null}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastName} id="lastName" isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input
            type="text"
            id="lastName"
            {...register('lastName', {
              required: 'El apellido es obligatorio',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
              maxLength: {
                value: 20,
                message: 'Máximo 20 caracteres',
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                message: 'Solo se permiten letras y no se permiten espacios en blanco.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.lastName && typeof errors.lastName.message === 'string' ? (
              <span>{errors.lastName.message}</span>
            ) : null}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} id="email" isRequired>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
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
              placeholder="Contraseña de 6 dígitos numéricos"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener exactamente 6 dígitos',
                },
                maxLength: {
                  value: 6,
                  message: 'La contraseña debe tener exactamente 6 dígitos',
                },
                pattern: {
                  value: /^\d{6}$/,
                  message: 'La contraseña debe contener exactamente 6 dígitos numéricos',
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
            type="submit"
            rounded={'full'}
            fontWeight={'bold'}
            color={'#FFF'}
            bg={'#1E59EA'}
            _hover={{ bg: '#0039A0', cursor: 'pointer' }}
            _active={{ bg: '#0039A0' }}
            size={{ base: 'md', md: 'lg' }}
            mx={2}
          >
            Registrarme
          </Button>
        </Stack>
        <Stack pt={5}>
          <Text align={'center'}>
            ¿Ya eres usuario?{' '}
            <Link to={ROUTES.USER_SIGNIN}>
              <Text as="b"> Inicia sesión</Text>
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};
