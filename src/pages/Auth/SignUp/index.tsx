import { useState } from 'react';
import { Flex, Box, Stack, Heading, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { DataRegisterProps } from '../../../interfaces';
import { AxiosError } from 'axios';
import { RegistrationForm } from '../../../components/RegistrationForm';
import { SecurityWordsModal } from '../../../components/SecurityWordsModal';
import { AuthService } from '../../../services/auth.service';
import { useToastNotification } from '../../../hooks/useToastNotification';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    const formData = values as DataRegisterProps;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { status, data } = await AuthService.registerUser(formData);
      if (status === 201) {
        displayToast(
          t('sign_up.alert_sign_up.alert_one.title'),
          t('sign_up.alert_sign_up.alert_one.welcome_message', { name: formData.name }),
          'success',
        );
        setDataUser(data.safeWords);
        onOpen();
      }
    } catch (error) {
      const serverError = error as AxiosError;
      if (serverError.code === 'ERR_NETWORK') {
        displayToast(
          t('sign_up.alert_sign_up.alert_two.title'),
          t('sign_up.alert_sign_up.alert_two.description'),
          'error',
          7000,
        );
        return;
      }
      const status = serverError.response?.status;
      if (status === 409) {
        displayToast(
          t('sign_up.alert_sign_up.alert_three.title'),
          t('sign_up.alert_sign_up.alert_three.description'),
          'error',
          7000,
        );
      } else {
        displayToast(
          t('sign_up.alert_sign_up.alert_two.title'),
          t('sign_up.alert_sign_up.alert_two.description'),
          'error',
          7000,
        );
      }
    }
  };

  return (
    <Flex align={'center'} justify={'center'} flexDirection={'column'} pb={4}>
      <Stack spacing={8} mx={'auto'} width={{ base: 'full', md: '65%' }}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {t('sign_up.title')}
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
