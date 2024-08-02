/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { NumericKeypad } from '../../../components/NumericKeypad';
import { AuthService } from '../../../services/auth.service';
import { useStoreAutheticated } from '../../../stores/authentication';
import { WalletsIProps } from '../../../interfaces';
import { ROUTES } from '../../../constants';
import { useToastNotification } from '../../../hooks/useToastNotification';
import { usePinInput } from '../../../hooks/usePinInput';
import { useTranslation } from 'react-i18next';
import './shake.css';

export const UserLogIn: React.FC = () => {
  const { displayToast } = useToastNotification();
  const navigation = useNavigate();
  const {
    addWallet,
    authenticateUser,
    setCurrentWallet,
    addSafeWords,
    setAvatarUrl,
    setTransactions,
  } = useStoreAutheticated();
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });
  const { t } = useTranslation();
  const email = watch('email');

  const {
    pin,
    borderColorPin,
    shake,
    setShake,
    setBorderColorPin,
    handleNumberClick,
    handleDeleteClick,
    handleDeleteAllClick,
    resetShake,
    setPin,
  } = usePinInput({
    onComplete: async (pin: string) => {
      try {
        const {
          status,
          data: { user, wallets, safeWords, transactions },
        } = await AuthService.loginUser({ email, password: pin });

        if (status === 200) {
          setBorderColorPin('green');
          setAvatarUrl(user.avatarUrl, false);
          // Autenticar al usuario
          authenticateUser({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
          });

          // Almacenar las wallet
          addWallet(wallets, true);

          // Almacenar las palabras claves
          addSafeWords(safeWords);

          // Almacenar las transacciones
          setTransactions(transactions);

          // Definir la wallet actual del usuario
          if (user.currentWallet === null) {
            setCurrentWallet(wallets[0], user.id);
          } else {
            const findWallet = wallets.find((w: WalletsIProps) => w.id === user.currentWallet);
            setCurrentWallet(findWallet, user.id, false);
          }

          setTimeout(() => {
            // Redireccionar al home
            navigation(ROUTES.HOME);
          }, 2000);
        }
      } catch (error: any) {
        // Server Off
        if (error.code === 'ERR_NETWORK') {
          setPin('');
          return displayToast(
            t('sign_in.alert_sign_in.alert_one.title'),
            t('sign_in.alert_sign_in.alert_one.description'),
            'error',
          );
        }

        const { status } = error.response;

        // Incorrect password
        if (status === 401) {
          setBorderColorPin('red');
          setShake(true);
          setTimeout(() => {
            resetShake();
          }, 1000);
          setPin('');
        } else if (status === 403) {
          // Account disabled
          displayToast(
            t('sign_in.alert_sign_in.alert_two.title'),
            t('sign_in.alert_sign_in.alert_two.description'),
            'error',
            12000,
          );
          setPin('');
        } else {
          // User not found
          displayToast(
            t('sign_in.alert_sign_in.alert_three.title'),
            t('sign_in.alert_sign_in.alert_three.description'),
            'error',
            12000,
          );
          setPin('');
        }
      }
    },
  });

  useEffect(() => {
    if (!isValid) {
      setPin('');
    }
  }, [email, isValid, setPin]);

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} mb={2}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              {t('sign_in.title')}
            </Heading>
            <FormControl isInvalid={!!errors.email} isRequired>
              <Input
                type="email"
                id="email"
                placeholder={t('sign_in.placeholder')}
                {...register('email', {
                  required: t('sign_in.validation_sign_in.email'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: t('sign_in.validation_sign_in.email_message'),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && typeof errors.email.message === 'string' ? (
                  <span>{errors.email.message}</span>
                ) : null}
              </FormErrorMessage>
            </FormControl>
            <Text align={'center'}>{t('sign_in.enter_password')}</Text>
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
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField
                        key={index}
                        readOnly
                        style={{ borderColor: borderColorPin }}
                        className={shake ? 'shake' : ''}
                        sx={{
                          borderWidth: '2px',
                          borderRadius: 'md',
                          fontSize: '1.7em',
                        }}
                      />
                    ))}
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Text textAlign={'center'} color={'gray.600'}>
              {t('sign_in.description')}
            </Text>
            <Box>
              <NumericKeypad
                onNumberClick={handleNumberClick}
                onDeleteClick={handleDeleteClick}
                onDeleteAllClick={handleDeleteAllClick}
                isDisabled={!isValid}
              />
            </Box>
            <Stack pt={6}>
              <Text align={'center'}>
                <Link className="text-[#1e59ea]" to={ROUTES.RECOVER_ACCOUNT}>
                  {t('sign_in.text_recover')}
                </Link>
              </Text>
              <Text align={'center'}>
                {t('sign_in.text_signin_one')}{' '}
                <Link className="text-[#1e59ea]" to={ROUTES.USER_SIGNUP}>
                  {t('sign_in.text_signin_two')}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
