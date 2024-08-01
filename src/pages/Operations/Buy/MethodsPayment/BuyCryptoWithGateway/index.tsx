import {
  Box,
  Flex,
  Text,
  Input,
  useColorModeValue,
  Image,
  Stack,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreCrypto } from '../../../../../stores/cryptocurrencies';
import { formatCurrency } from '../../../../../utils';
import { SupportedCurrency } from '../../../../../constants';
import { PaymentService } from '../../../../../services/payment.service';
import { useStorePaymentMethods } from '../../../../../stores/paymentMethods';
import { useStoreAutheticated } from '../../../../../stores/authentication';
import { useToastNotification } from '../../../../../hooks/useToastNotification';
import { AxiosError } from 'axios';

type FormData = {
  amount: string;
};

export const BuyCryptoWithGateway = () => {
  const { selectedPaymentMethod, setSaveDataPayment } = useStorePaymentMethods();
  const { currentWallet, authenticatedUser } = useStoreAutheticated();
  const { displayToast } = useToastNotification();
  const {
    state: { crypto, symbol },
  } = useLocation();
  const { currency } = useStoreCrypto();
  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
    },
  });

  const amount = parseFloat(watch('amount'));
  const priceInUSD =
    amount && !isNaN(amount) && amount > 0
      ? (crypto.RAW?.[currency]?.PRICE * amount).toFixed(2)
      : '0';

  const onSubmit = async (dataForm: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //Realizar peticion para crear la session de pago
      const {
        status,
        data: { data },
      } = await PaymentService.paymentWithStripe({
        paymentMethod: selectedPaymentMethod,
        unit_amount: parseFloat(priceInUSD),
        currency: currency.toLowerCase(),
        nameCrypto: `${crypto.CoinInfo.FullName} - ${amount} ${crypto.CoinInfo.Name}`,
        urlImage: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
        customer_email: authenticatedUser.email as string,
      });

      if (status === 200) {
        // Redireccionar al gateway de pago, sea stripe o mercado pago
        if (selectedPaymentMethod === 'stripe') {
          window.location.href = data.url;
        } else {
          window.location.href = data.init_point;
        }

        //Guardar la informacion del pago en el state
        setSaveDataPayment({
          amount: parseFloat(dataForm.amount),
          cryptoID: crypto.CoinInfo.Name,
          idPayment: data.id,
          paymentGateway: selectedPaymentMethod,
          originWalletId: currentWallet?.id as string,
        });
      }
    } catch (error) {
      const serverError = error as AxiosError;

      if (serverError.response?.status === 400) {
        displayToast(
          'Error en el Pago',
          'El monto de la transacción debe ser superior a 1.',
          'error',
        );

        return;
      }

      displayToast(
        'Error',
        'Hubo un problema al procesar la transacción. Por favor, inténtelo nuevamente.',
        'error',
      );
    }
  };

  return (
    <Stack maxWidth="500px" spacing={7} as="form" onSubmit={handleSubmit(onSubmit)} mx={'auto'}>
      <Flex justifyContent={'space-between'}>
        <Flex>
          <Image
            src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
            alt={crypto.CoinInfo.Name}
            boxSize={{ base: '35px', md: '50px' }}
            borderRadius="full"
          />
          <Text
            ml={2}
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            textTransform="capitalize"
          >
            {crypto.CoinInfo.FullName}
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
      <Box px={5} pb={5} borderWidth="1px" borderRadius="lg" bg={BG_COLOR} boxShadow="lg">
        <Flex alignItems="center" direction={'column'} justifyContent="center" mb={4}>
          {selectedPaymentMethod === 'stripe' ? (
            <Icon icon={'logos:stripe'} width={70} height={70} />
          ) : (
            <Icon icon={'arcticons:mercado-libre'} color="#00BCFF" width={70} height={70} />
          )}
          <Text fontSize={{ base: 'md', md: 'lg' }} ml={2} textTransform={'capitalize'}>
            Payment powered by {selectedPaymentMethod}
          </Text>
        </Flex>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: {
              positive: (value) => parseFloat(value) > 0 || 'Amount must be greater than zero',
              number: (value) => !isNaN(parseFloat(value)) || 'Amount must be a number',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={`Amount ${crypto.CoinInfo.Name}`}
              type="number"
              mb={4}
              step={'any'}
              isInvalid={!!errors.amount}
            />
          )}
        />
        {errors.amount && <Text color="red.500">{errors.amount.message}</Text>}
        {amount > 0 && priceInUSD && (
          <Text>
            You will pay:{' '}
            {`${symbol}${formatCurrency(parseFloat(priceInUSD), currency as SupportedCurrency)}`}{' '}
            {currency}
          </Text>
        )}
        <Button
          isLoading={isSubmitting}
          type="submit"
          mt={4}
          rounded={'full'}
          fontWeight={'bold'}
          color={'#FFF'}
          bg={'#1E59EA'}
          _hover={{ bg: '#0039A0', cursor: 'pointer' }}
          _active={{ bg: '#0039A0' }}
          size={{ base: 'md', md: 'lg' }}
          mx={2}
          width="100%"
          disabled={!isValid}
        >
          Buy {crypto.CoinInfo.FullName}
        </Button>
      </Box>
    </Stack>
  );
};