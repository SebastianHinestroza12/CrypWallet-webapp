/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Divider, Flex, Stack, Text, Image } from '@chakra-ui/react';
import { CryptoNotFound } from '../../components/CryptoNotFound';
import { Icon } from '@iconify/react';
import { ROUTES, SupportedCurrency } from '../../constants';
import { OperationButton } from '../../components/OperationButton';
import { InviteToLogin } from '../../components/InviteToLogin';
import { useStoreAutheticated } from '../../stores/authentication';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { formatCurrency } from '../../utils';
import { EmptyTransaction } from '../../components/EmptyTransactions';
import { TransactionUserIProps } from '../../interfaces';
import { TransactionHistory } from '../../components/TransactionHistory';

export const DetailCrypto = () => {
  const { isAuthenticated, currentWallet, transactions } = useStoreAutheticated();
  const { currency } = useStoreCrypto();
  const { cryptoId } = useParams<{ cryptoId: string }>();
  const {
    state: { infoCrypto },
  } = useLocation();
  const [transactionCoin, setTransactionCoin] = useState<TransactionUserIProps[]>([]);
  const crypto = infoCrypto;
  const navigate = useNavigate();

  const coinCrypto = currentWallet?.cryptoCurrency[crypto.CoinInfo.Name];
  const price = parseFloat((crypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
  const coinSymbol = crypto.DISPLAY?.[currency]?.TOSYMBOL;
  const coinName = crypto.CoinInfo.Name;
  const amount = coinCrypto ? formatCurrency(coinCrypto * price, currency as SupportedCurrency) : 0;

  useEffect(() => {
    if (currentWallet && isAuthenticated) {
      setTransactionCoin(
        transactions.filter(
          (transaction) =>
            (transaction.destination === currentWallet.address &&
              transaction.symbol === coinName) ||
            (transaction.origin === currentWallet.address && transaction.symbol === coinName),
        ),
      );
    }
  }, []);

  const handleEventClick = () => {
    navigate(`${ROUTES.PAYMENT_METHODS_CRYPTO}`, {
      state: {
        crypto: infoCrypto,
        symbol: infoCrypto.DISPLAY?.[currency]?.TOSYMBOL,
      },
    });
  };

  if (!crypto) {
    return <CryptoNotFound nameCrypto={cryptoId as string} />;
  }

  return (
    <Stack spacing={{ base: 4, md: 10 }}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Text textAlign={'initial'} textTransform={'uppercase'} fontSize="lg" fontWeight="bold">
            {coinName}
          </Text>
          <Flex alignItems={'center'}>
            <Text color={'gray.500'} fontSize={'smaller'}>
              Coin
            </Text>
            <Divider orientation="vertical" borderColor={'gray.500'} mx={2} height="15px" />
            <Text fontSize={'smaller'} color={'gray.500'} textTransform={'capitalize'}>
              {crypto.CoinInfo.FullName}
            </Text>
          </Flex>
        </Box>
        <Box
          _hover={{ cursor: 'pointer', transform: 'scale(1.2)' }}
          onClick={() =>
            navigate(`${ROUTES.CRYPTO_DETAIL_OVERVIEW_MAIN}/${cryptoId}`, {
              state: { infoCrypto: crypto },
            })
          }
        >
          <Icon icon={'ic:baseline-info'} width={30} />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box>
          <Image
            src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
            alt={crypto.CoinInfo.Name}
            boxSize={{ base: '42px', md: '50px' }}
            borderRadius="full"
          />
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            {isAuthenticated && coinCrypto ? coinCrypto : 0} {coinName}
          </Text>
        </Box>
        <Box>
          <Text color={'gray.500'}>
            {coinCrypto ? '=' : ''}
            {`${coinSymbol} ${amount}`}
          </Text>
        </Box>
      </Flex>
      <Flex flexDirection={'column'}>
        <Box>
          <OperationButton crypto={crypto} />
        </Box>
        <Box pt={4}>
          <Divider borderColor={'gray.500'} />
        </Box>
      </Flex>
      {isAuthenticated ? (
        transactionCoin.length === 0 ? (
          <EmptyTransaction coinName={crypto.CoinInfo.FullName} eventClick={handleEventClick} />
        ) : (
          <Box pb={4}>
            <TransactionHistory transactions={transactionCoin} />
          </Box>
        )
      ) : (
        <InviteToLogin />
      )}
    </Stack>
  );
};
