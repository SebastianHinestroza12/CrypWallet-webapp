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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          t('recover_account.step_one.alert_step.alert_one.title'),
          t('recover_account.step_one.alert_step.alert_one.description'),
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
        displayToast(
          t('recover_account.step_one.alert_step.alert_two.title'),
          t('recover_account.step_one.alert_step.alert_two.description'),
          'error',
        );
        return;
      }

      const { response } = axiosError;
      if (response?.status === 404) {
        displayToast(
          t('recover_account.step_one.alert_step.alert_three.title'),
          t('recover_account.step_one.alert_step.alert_three.description'),
          'error',
        );
        return;
      }

      displayToast(
        t('recover_account.step_one.alert_step.alert_four.title'),
        t('recover_account.step_one.alert_step.alert_four.description'),
        'error',
      );
    }
  };

  return (
    <Flex align="center">
      <Stack spacing={4} bg={bg} rounded="xl" boxShadow="2xl" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          {t('recover_account.step_one.title')}
        </Heading>

        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          {t('recover_account.step_one.description')}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <Input
              autoFocus
              placeholder="correo@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              {...register('email', {
                required: t('recover_account.step_one.validation_step.email'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('recover_account.step_one.validation_step.email_message'),
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
              {t('recover_account.step_one.button_ok')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
