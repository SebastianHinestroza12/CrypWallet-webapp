import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Divider, Flex, Stack, Text, Image, Button } from '@chakra-ui/react';
import { CryptoNotFound } from '../../components/CryptoNotFound';
import { Icon } from '@iconify/react';
import { OPERATION_BUTTONS, ROUTES, SupportedCurrency } from '../../constants';
import { OperationButton } from '../../components/OperationButton';
import { InviteToLogin } from '../../components/InviteToLogin';
import { useStoreAutheticated } from '../../stores/authentication';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { formatCurrency } from '../../utils';

export const DetailCrypto = () => {
  const { isAuthenticated, currentWallet } = useStoreAutheticated();
  const { currency } = useStoreCrypto();
  const { cryptoId } = useParams<{ cryptoId: string }>();
  const {
    state: { infoCrypto },
  } = useLocation();
  const crypto = infoCrypto;
  const navigate = useNavigate();

  if (!crypto) {
    return <CryptoNotFound nameCrypto={cryptoId as string} />;
  }

  const coinCrypto = currentWallet?.cryptoCurrency[crypto.CoinInfo.Name];
  const price = parseFloat((crypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
  const coinSymbol = crypto.DISPLAY?.[currency]?.TOSYMBOL;
  const coinName = crypto.CoinInfo.Name;
  const amount = coinCrypto ? formatCurrency(coinCrypto * price, currency as SupportedCurrency) : 0;

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
        <Box display={'flex'} justifyContent={'space-between'}>
          {OPERATION_BUTTONS.map((button) => (
            <OperationButton key={button.text} icon={button.icon} text={button.text} />
          ))}
        </Box>
        <Box pt={4}>
          <Divider borderColor={'gray.500'} />
        </Box>
      </Flex>
      {isAuthenticated ? (
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          textAlign={'center'}
          mb={4}
        >
          <Box mb={{ base: 4, md: 6 }}>
            <Icon icon={'quill:paper'} width={60} color={'blue.500'} />
          </Box>
          <Box mb={{ base: 4, md: 6 }}>
            <Text color={'gray.600'} fontSize={'lg'} fontWeight={'medium'}>
              No tienes transacciones todavía.
            </Text>
            <Text color={'gray.400'} fontSize={'sm'}>
              Las transacciones aparecerán aquí cuando las realices.
            </Text>
          </Box>
          <Box>
            <Button
              rounded={'full'}
              fontWeight={'bold'}
              color={'#FFF'}
              bg={'#1E59EA'}
              _hover={{ bg: '#0039A0', cursor: 'pointer' }}
              _active={{ bg: '#0039A0' }}
              size={{ base: 'md', md: 'lg' }}
            >
              {`Compra ${coinName}`}
            </Button>
          </Box>
        </Flex>
      ) : (
        <InviteToLogin />
      )}
    </Stack>
  );
};
