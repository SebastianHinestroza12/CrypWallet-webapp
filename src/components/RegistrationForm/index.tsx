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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} id="name" isRequired>
          <FormLabel>{t('sign_up.form.label_name')}</FormLabel>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: t('sign_up.form.validate_input.name_last_name.required'),
              minLength: {
                value: 3,
                message: t('sign_up.form.validate_input.name_last_name.min_length'),
              },
              maxLength: {
                value: 20,
                message: t('sign_up.form.validate_input.name_last_name.max_length'),
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                message: t('sign_up.form.validate_input.name_last_name.pattern'),
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
          <FormLabel>{t('sign_up.form.label_last_name')}</FormLabel>
          <Input
            type="text"
            id="lastName"
            {...register('lastName', {
              required: t('sign_up.form.validate_input.name_last_name.required'),
              minLength: {
                value: 3,
                message: t('sign_up.form.validate_input.name_last_name.min_length'),
              },
              maxLength: {
                value: 20,
                message: t('sign_up.form.validate_input.name_last_name.max_length'),
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                message: t('sign_up.form.validate_input.name_last_name.pattern'),
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
          <FormLabel>{t('sign_up.form.label_email')}</FormLabel>
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: t('sign_up.form.validate_input.email.required'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t('sign_up.form.validate_input.email.pattern'),
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
          <FormLabel>{t('sign_up.form.label_password')}</FormLabel>
          <InputGroup>
            <Input
              placeholder={t('sign_up.form.validate_input.password.placeholder')}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: t('sign_up.form.validate_input.password.required'),
                minLength: {
                  value: 6,
                  message: t('sign_up.form.validate_input.password.length'),
                },
                maxLength: {
                  value: 6,
                  message: t('sign_up.form.validate_input.password.length'),
                },
                pattern: {
                  value: /^\d{6}$/,
                  message: t('sign_up.form.validate_input.password.pattern'),
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
            {t('sign_up.form.button_sign_up')}
          </Button>
        </Stack>
        <Stack pt={5}>
          <Text align={'center'}>
            {t('sign_up.form.is_existing')}{' '}
            <Link to={ROUTES.USER_SIGNIN}>
              <Text as="b">{t('sign_up.form.sing_in')}</Text>
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};
