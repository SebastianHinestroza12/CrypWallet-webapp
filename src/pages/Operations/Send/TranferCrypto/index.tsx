import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  FormErrorMessage,
  Image,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStoreAutheticated } from '../../../../stores/authentication';
import { useStoreCrypto } from '../../../../stores/cryptocurrencies';
import { formatCurrency } from '../../../../utils';
import { SupportedCurrency } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { useStoreOperations } from '../../../../stores/operations';
import { WalletServices } from '../../../../services/wallet.service';
import { useToastNotification } from '../../../../hooks/useToastNotification';
import { PiApproximateEquals } from 'react-icons/pi';
import { AxiosError } from 'axios';
import { TransactionsType } from '../../../../interfaces';
import { useTranslation } from 'react-i18next';

interface FormValues {
  address: string;
  amount: string;
}

export const TransferCrypto = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      address: '',
      amount: '',
    },
    mode: 'onChange',
  });
  const [equivalent, setEquivalent] = useState('0.00');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { currentWallet, isAuthenticated } = useStoreAutheticated();
  const { setTransferStep, setCryptoShippingdata } = useStoreOperations();
  const { currency } = useStoreCrypto();
  const nameCrypto = state.crypto?.CoinInfo?.Name;
  const maxAmount = currentWallet?.cryptoCurrency[nameCrypto] ?? 0;
  const BG_COLOR = useColorModeValue('#FFF', '#171717');

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => setValue('address', text));
    if (!errors) {
      clearErrors('address');
    }
  };

  const { displayToast } = useToastNotification();

  const handleMax = () => {
    if (isAuthenticated) {
      const maxAmountStr = maxAmount.toString();
      setValue('amount', maxAmountStr);
      const equivalentValue = parseFloat(maxAmountStr) * state.crypto?.RAW[currency]?.PRICE;
      setEquivalent(equivalentValue.toFixed(2));
      clearErrors('amount');
      trigger('amount');
    }
  };

  const handleAmountChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setValue('amount', value);
      const equivalentValue = parsedValue * state.crypto?.RAW[currency]?.PRICE;
      setEquivalent(equivalentValue.toFixed(2));

      if (parsedValue > maxAmount) {
        setError('amount', {
          type: 'manual',
          message: t('send.validate_input.amount.is_valid', { maxAmount, nameCrypto }),
        });

        return;
      }

      clearErrors('amount');
    } else {
      setValue('amount', '');
      setEquivalent('0.00');
      setError('amount', { type: 'manual', message: t('send.validate_input.amount.invalid') });
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (currentWallet?.address === data.address) {
        displayToast(
          t('send.alert_send.alert_one.title'),
          t('send.alert_send.alert_one.description'),
          'info',
        );
        return;
      }

      const response = await WalletServices.getWalletByAddress(data.address);

      if (response.status === 200) {
        //Actualizar el estado global con toda la info necesario para la tranferencia
        setCryptoShippingdata({
          amount: data.amount,
          cryptoCurrency: nameCrypto,
          destinationWalletAddress: data.address,
          destinationWalletId: response.data.destination[0].walletid,
          destinationUser: response.data.destination[0].name,
          typeTransaction: TransactionsType['Send'],
          cryptoData: state.crypto,
        });

        setTransferStep(2);
      }
    } catch (error) {
      const serverError = error as AxiosError;
      if (serverError.code === 'ERR_NETWORK') {
        displayToast(
          t('send.alert_send.alert_two.title'),
          t('send.alert_send.alert_two.description'),
          'error',
          7000,
        );
        return;
      }
      const status = serverError.response?.status;
      if (status === 404) {
        displayToast(
          t('send.alert_send.alert_three.title'),
          t('send.alert_send.alert_three.description'),
          'error',
        );
        return;
      }
      displayToast(
        t('send.alert_send.alert_four.title'),
        t('send.alert_send.alert_four.description'),
        'error',
      );
    }
  };

  return (
    <Stack spacing={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex alignItems={'center'}>
          <Image
            src={`https://www.cryptocompare.com${state.crypto.CoinInfo.ImageUrl}`}
            alt={state.crypto.CoinInfo.Name}
            boxSize={{ base: '42px', md: '50px' }}
            borderRadius="full"
          />
          <Text
            ml={2}
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            textTransform="uppercase"
          >
            {`${nameCrypto} (${t('send.coin')})`}
          </Text>
        </Flex>
        <Box>
          <IconButton
            icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
            variant="outline"
            aria-label="Go back"
            onClick={() => navigate(-1)}
          />
        </Box>
      </Flex>
      <Box p={5} boxShadow="md" borderRadius="md" bg={BG_COLOR}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="address" isInvalid={!!errors.address}>
              <FormLabel>{t('send.form.label_address')}</FormLabel>
              <InputGroup>
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: t('send.validate_input.address.required'),
                    validate: (value) => {
                      if (typeof value !== 'string') {
                        return t('send.validate_input.address.is_string');
                      }
                      if (/^\s|\s$|\s/.test(value)) {
                        return t('send.validate_input.address.pattern');
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={t('send.form.placeholder_address')}
                      {...field}
                    />
                  )}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    _hover={{ bg: 'blue.500' }}
                    bg={'#1e59ea'}
                    color={'#FFF'}
                    onClick={handlePaste}
                  >
                    {t('send.form.button_paste')}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="amount" isInvalid={!!errors.amount}>
              <FormLabel>{t('send.form.label_amount')}</FormLabel>
              <InputGroup>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: t('send.validate_input.amount.required'),
                    validate: (value) => {
                      const parsedValue = parseFloat(value);
                      if (isNaN(parsedValue)) {
                        return t('send.validate_input.amount.number');
                      }
                      if (/^\s|\s$|\s/.test(value)) {
                        return t('send.validate_input.amount.pattern');
                      }
                      if (parsedValue > maxAmount) {
                        return t('send.validate_input.amount.is_valid', { maxAmount, nameCrypto });
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder={t('send.form.placeholder_amount', { coinName: nameCrypto })}
                      {...field}
                      onChange={(e) => handleAmountChange(e.target.value)}
                    />
                  )}
                />
                <InputRightElement width="7rem">
                  <Box display="flex" alignItems="center">
                    <Text mr={2}>{nameCrypto}</Text>
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg={'#1e59ea'}
                      _hover={{ bg: 'blue.500' }}
                      color={'#FFF'}
                      onClick={handleMax}
                    >
                      {t('send.form.button_max')}
                    </Button>
                  </Box>
                </InputRightElement>
              </InputGroup>
              {errors.amount && (
                <Text color="red.500" fontSize="sm">
                  {errors.amount.message}
                </Text>
              )}
            </FormControl>

            <Flex justifyContent={'center'} alignItems={'center'} my={3}>
              <Box>
                <PiApproximateEquals color={'gray'} />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                {`${state.symbol}${formatCurrency(parseFloat(equivalent), currency as SupportedCurrency)}`}
              </Text>
            </Flex>

            <Button
              mx={'auto'}
              bg={'#1e59ea'}
              isLoading={isSubmitting}
              color={'white'}
              w={{ base: 'full', md: 'sm' }}
              _hover={{ bg: 'blue.500' }}
              type="submit"
              width="full"
              isDisabled={!isValid || isSubmitting}
            >
              {t('send.form.button')}
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};
