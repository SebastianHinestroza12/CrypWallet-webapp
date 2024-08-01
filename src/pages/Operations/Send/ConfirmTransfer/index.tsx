import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
  Flex,
  useColorModeValue,
  Icon,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Icon as Iconify } from '@iconify/react';
import { useStoreOperations } from '../../../../stores/operations';
import { useStoreAutheticated } from '../../../../stores/authentication';
import { useStoreVisibilityData } from '../../../../stores/dataVisibility';
import { TransactionService } from '../../../../services/transactions.service';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { useToastNotification } from '../../../../hooks/useToastNotification';
import { WalletServices } from '../../../../services/wallet.service';
import { WalletsIProps } from '../../../../interfaces';
interface FormValues {
  description: string;
}

export const ConfirmTransfer = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const {
    currentWallet,
    authenticatedUser: { id },
    addWallet,
    setCurrentWallet,
    setTransactions,
  } = useStoreAutheticated();
  const { symbol } = useStoreVisibilityData();
  const { removeCryptoShippingdata, cryptoShippingdata } = useStoreOperations();
  const { displayToast } = useToastNotification();
  const BG_COLOR = useColorModeValue('#FFF', '#171717');

  const onSubmit = async (dataForm: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      //Realizar la transacción
      const { status, data } = await TransactionService.sendCrypto({
        amount: parseFloat(cryptoShippingdata.amount as string),
        cryptocurrencyId: cryptoShippingdata.cryptoCurrency,
        destinyWalletId: cryptoShippingdata.destinationWalletId,
        originWalletId: currentWallet?.id ?? '',
        description: dataForm.description,
      });

      if (status === 201) {
        navigate(ROUTES.TRANSACTION_SUCCESS, { state: { data, cryptoShippingdata } });
        removeCryptoShippingdata();
        // Actualizar la data de las wallets del usuario
        const response = await WalletServices.getAllWallets(id!);

        if (response.status === 200) {
          const allWallets = response.data.wallets;
          addWallet(allWallets, true);

          // Actualizar la wallet actual del usuario
          const wallet = allWallets.find(
            (wallet: WalletsIProps) => wallet.id === currentWallet?.id,
          );
          setCurrentWallet(wallet, id!, false);
        }

        const getTransacions = await TransactionService.getAllTransaction(id!);

        if (getTransacions?.status === 200) {
          const response = getTransacions.data.transactions;
          setTransactions(response);
        }
      }
    } catch (error) {
      displayToast(
        'Error sending crypto',
        'Please check recipient address and network connection.',
        'error',
      );
    }
  };

  const anonymizeName = (name: string) => {
    let nameFormated = '';
    const parts = name.split(' ');

    if (parts.length <= 1) return name;

    parts.forEach((element) => {
      if (element.length <= 2) {
        nameFormated += `${element} `;
        return;
      }
      const chart = element.slice(0, -2) + ' ***';
      nameFormated += `${chart} `;
    });

    return nameFormated.trim();
  };

  return (
    <Stack spacing={6}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text ml={2} fontWeight="bold" fontSize="2xl" textAlign="center" textTransform="capitalize">
          {`Send ${cryptoShippingdata.cryptoCurrency} (COIN)`}
        </Text>
        <Box>
          <IconButton
            icon={<Iconify icon="mdi:arrow-left" width="24" height="24" />}
            variant="outline"
            aria-label="Go back"
            onClick={() => removeCryptoShippingdata()}
          />
        </Box>
      </Flex>
      <Box p={5} boxShadow="lg" borderRadius="md" bg={BG_COLOR} mb={4}>
        <Stack spacing={4}>
          <Flex justifyContent="center" alignItems="center" mb={5}>
            <Icon as={FaCheckCircle} w={10} h={10} color="green.500" />
            <Text ml={2} fontWeight="bold" fontSize="2xl" textAlign="center">
              Confirm Transfer
            </Text>
          </Flex>
          <Stack spacing={4}>
            <HStack>
              <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'medium' }}>
                Destination User:
              </Text>
              <Text>{anonymizeName(cryptoShippingdata.destinationUser)}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Destiny Wallet:</Text>
              <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="200px">
                {cryptoShippingdata.destinationWalletAddress}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Origin Wallet:</Text>
              <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="200px">
                {currentWallet?.address}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Date:</Text>
              <Text>{new Date().toLocaleString()}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Amount:</Text>
              <Text>
                {cryptoShippingdata.amount} {cryptoShippingdata.cryptoCurrency}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Transaction Fee:</Text>
              <Text>{symbol} 0.00</Text>
            </HStack>

            <FormControl id="description">
              <FormLabel>Description (optional)</FormLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea placeholder="Add a description (optional)" {...field} />
                )}
              />
            </FormControl>

            <Button
              isLoading={isSubmitting}
              mx={'auto'}
              bg={'#1e59ea'}
              color={'white'}
              w={{ base: 'full', md: 'sm' }}
              _hover={{ bg: 'blue.500' }}
              type="submit"
              width="full"
              mt={4}
              onClick={handleSubmit(onSubmit)}
            >
              Confirm and Transfer
            </Button>
            <Button
              mx={'auto'}
              bg={'red.500'}
              color={'white'}
              w={{ base: 'full', md: 'sm' }}
              _hover={{ bg: 'red.600' }}
              mt={2}
              onClick={() => removeCryptoShippingdata()}
              width="full"
            >
              Cancel Transfer
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
