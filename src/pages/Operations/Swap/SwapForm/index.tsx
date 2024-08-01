/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Stack,
  FormControl,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { SwapItem } from '../../../../components/SwapItem/index';
import { useStoreCrypto } from '../../../../stores/cryptocurrencies';
import { useStoreAutheticated } from '../../../../stores/authentication';
import { ROUTES, SupportedCurrency } from '../../../../constants';
import { formatCurrency } from '../../../../utils';
import { TransactionService } from '../../../../services/transactions.service';
import { ExchangeDataIProps } from '../../../../types';
import { WalletServices } from '../../../../services/wallet.service';
import { WalletsIProps } from '../../../../interfaces';
import { useToastNotification } from '../../../../hooks/useToastNotification';
import axios from 'axios';

type TextButtonIProps = {
  text: string;
  isBuy: boolean;
};

export const SwapForm = () => {
  const {
    currentCrypto,
    currency,
    fromCryptoSwap,
    setFromCryptoSwap,
    toCryptoSwap,
    setToCryptoSwap,
  } = useStoreCrypto();
  const navigate = useNavigate();
  const {
    currentWallet,
    authenticatedUser: { id },
    addWallet,
    setCurrentWallet,
    setTransactions,
  } = useStoreAutheticated();
  const {
    state: { crypto, symbol },
    search,
  } = useLocation();
  const [textButton, setTextButton] = useState<TextButtonIProps>({
    text: 'Continuar',
    isBuy: false,
  });
  const searchParams = new URLSearchParams(search);
  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState<string>('0');
  const [equalAmount, setEqualAmount] = useState<string>('0');
  const [amountSwap, setAmountSwap] = useState<string>('0');
  const [disableButton, setDisableButton] = useState(false);
  const [equalAmountSwap, setEqualAmountSwap] = useState<string>('0');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState<string | null>(null);
  const nameSymbolFrom = fromCryptoSwap?.CoinInfo.Name;
  const nameSymbolTo = toCryptoSwap?.CoinInfo.Name;
  const paramUrl = searchParams.get('origin');
  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const { displayToast } = useToastNotification();

  useEffect(() => {
    if (paramUrl === 'to') {
      setToCryptoSwap(crypto);
      return;
    }

    if (paramUrl === 'from') {
      setFromCryptoSwap(crypto);

      if (toCryptoSwap === null) {
        const randomCrypto = Math.floor(Math.random() * 51);
        setToCryptoSwap(currentCrypto[randomCrypto]);
      }
    }
  }, []);

  useEffect(() => {
    if (nameSymbolTo === nameSymbolFrom) {
      setTextButton({
        text: 'Not available',
        isBuy: false,
      });
      setDisableButton(true);

      return;
    }

    if (parseFloat(amount) > (currentWallet?.cryptoCurrency[nameSymbolFrom ?? ''] ?? 0)) {
      setTextButton({
        text: `Insufficient ${nameSymbolFrom} balance`,
        isBuy: true,
      });
      setShowBuy(true);
    } else {
      setTextButton({
        text: 'Continuar',
        isBuy: false,
      });
      setShowBuy(false);
    }

    setDisableButton(false);
  }, [amount, currentWallet?.cryptoCurrency, nameSymbolFrom, nameSymbolTo]);

  const handleReverseCoin = () => {
    setToCryptoSwap(fromCryptoSwap);
    setFromCryptoSwap(toCryptoSwap);

    // Intercambia los montos de las criptomonedas
    const tempAmount = amountSwap;
    const tempAmountSwap = amount;

    setAmount(tempAmount);
    setAmountSwap(tempAmountSwap);
  };

  const handleBuyCrypto = () => {
    navigate(`${ROUTES.OPERATIONS_BUY_CRYPTO_WITH_GATEWAY}`, {
      state: {
        crypto: fromCryptoSwap,
        symbol: fromCryptoSwap?.DISPLAY?.[currency]?.TOSYMBOL,
      },
    });
  };

  const handleChangeCrypto = (param: string) => {
    navigate(`${ROUTES.OPERATIONS_SWAP_CRYPTO}?origin=${param}`);
  };

  const handleInputChange = (value: string) => {
    // Permitir valores vacíos o que contengan solo un punto decimal
    if (value === '' || value === '.' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);

      if (value === '' || value === '.') {
        setEqualAmount('0');
        setEqualAmountSwap('0');
        setAmountSwap('0');
        // setAmount('0');
        setError(null);
        return;
      }

      const parseValue = parseFloat(value);
      const priceFrom = parseFloat((fromCryptoSwap?.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
      const priceTo = parseFloat((toCryptoSwap?.RAW?.[currency]?.PRICE ?? 0).toFixed(2));

      if (isNaN(parseValue) || parseValue < 0.001) {
        setError('Amount must be a number greater than 0.001');
        setEqualAmount('0');
        setEqualAmountSwap('0');
      } else {
        const newEqualAmount = parseValue * priceFrom;
        const newAmountSwap = parseFloat((parseValue * (priceFrom / priceTo)).toFixed(6));
        const calculateToAmount = newAmountSwap * priceTo;

        setAmountSwap(newAmountSwap.toString());
        setEqualAmount(formatCurrency(newEqualAmount, currency as SupportedCurrency));
        setEqualAmountSwap(formatCurrency(calculateToAmount, currency as SupportedCurrency));
        setError(null);
      }
    }
  };

  const validateData = async () => {
    const parseAmount = parseFloat(amount);

    if (textButton.isBuy) {
      handleBuyCrypto();
      return;
    }

    if (error) {
      return;
    }

    if (
      parseAmount > (currentWallet?.cryptoCurrency[nameSymbolFrom ?? ''] ?? 0) ||
      parseAmount === 0
    ) {
      setError('Invalid amount');
      return;
    }

    setIsDialogOpen(true);
  };

  const performOperation = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const dataSwap: ExchangeDataIProps = {
        walletId: currentWallet?.id as string,
        data: [
          {
            id: nameSymbolFrom ?? '',
            type: 'decrement',
            currentAmountCrypto: currentWallet?.cryptoCurrency[nameSymbolFrom ?? ''] ?? 0,
            amount: parseFloat(amount),
          },
          {
            id: nameSymbolTo ?? '',
            type: 'increment',
            amount: parseFloat(amountSwap),
          },
        ],
      };

      const { status } = await TransactionService.swapCrypto(dataSwap);

      if (status === 200) {
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

        setIsLoading(false);
        setIsDialogOpen(false);

        displayToast(
          'Swap Successful',
          'Your cryptocurrency exchange has been completed successfully.',
          'success',
        );

        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setIsDialogOpen(false);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          const errorMessage =
            error.response?.data?.message ||
            'Invalid request. Please check the amount and try again.';
          displayToast('Swap Crypto Error', errorMessage, 'error');
        } else {
          displayToast(
            'Swap Crypto Error',
            'An unexpected error occurred. Please try again later.',
            'error',
          );
        }
      } else {
        displayToast(
          'Swap Crypto Error',
          'An unexpected error occurred. Please try again later.',
          'error',
        );
      }
    }
  };

  return (
    <Box>
      <Heading as="h3" size="lg" textAlign="center" mb={5}>
        Swap
      </Heading>
      <Stack my={7} spacing={3}>
        <SwapItem
          title="from"
          needToBuy={showBuy}
          equalAmount={equalAmount}
          symbolCurrency={symbol}
          changeCrypto={() => handleChangeCrypto('from')}
          handleBuyCrypto={handleBuyCrypto}
          unitAmount={currentWallet?.cryptoCurrency[nameSymbolFrom ?? ''] ?? 0}
          pathImage={fromCryptoSwap?.CoinInfo?.ImageUrl ?? ''}
          name={fromCryptoSwap?.CoinInfo?.FullName ?? ''}
          showSwapIcon={false}
          symbol={nameSymbolFrom ?? ''}
          handleInputChange={handleInputChange}
          valueInput={amount}
          isInput
        />
        <SwapItem
          title="to"
          amountCrypto={amountSwap}
          equalAmount={equalAmountSwap}
          symbolCurrency={symbol}
          changeCrypto={() => handleChangeCrypto('to')}
          unitAmount={currentWallet?.cryptoCurrency[nameSymbolTo ?? ''] ?? 0}
          pathImage={toCryptoSwap?.CoinInfo.ImageUrl ?? ''}
          name={toCryptoSwap?.CoinInfo.FullName ?? ''}
          reverseCoin={handleReverseCoin}
          symbol={nameSymbolTo ?? ''}
          renderCalculateAmount={parseFloat(amount) !== 0}
          valueInput={amount}
          symbolFrom={nameSymbolFrom ?? ''}
          totalSwap={amountSwap}
          showSwapIcon
        />
      </Stack>
      <FormControl isInvalid={!!error}>
        {error && <FormErrorMessage mb={3}>{error}</FormErrorMessage>}
        <Button
          isDisabled={disableButton || !!error}
          onClick={validateData}
          rounded={'full'}
          fontWeight={'bold'}
          color={'#FFF'}
          bg={'#1E59EA'}
          size={'lg'}
          _hover={{ bg: '#0039A0', cursor: 'pointer' }}
          _active={{ bg: '#0039A0' }}
          width={{ base: 'full', md: 'sm' }}
          mx={{ base: 0, md: 'auto' }}
        >
          {textButton.text}
        </Button>
      </FormControl>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay display="flex" justifyContent="center" alignItems="center">
          <AlertDialogContent
            bg={BG_COLOR}
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxWidth="xs"
            p={1}
            mx="auto"
            boxShadow="2xl"
          >
            <AlertDialogBody>
              ¿Estás seguro(a) de que deseas realizar el cambio de criptomonedas?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                bg={'#E53E3E'}
                color={'#FFF'}
                _hover={{ bg: '#C43030' }}
                ref={cancelRef}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                isLoading={isLoading}
                bg={'#1e59ea'}
                _hover={{ bg: '#0039A0', cursor: 'pointer' }}
                _active={{ bg: '#0039A0' }}
                color={'#FFF'}
                onClick={performOperation}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
