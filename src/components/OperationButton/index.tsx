/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Flex, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { OPERATION_BUTTONS, ROUTES } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { CryptoCompareData, OperationButtonConfig } from '../../interfaces';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { useStoreAutheticated } from '../../stores/authentication';
import { useToastNotification } from '../../hooks/useToastNotification';

interface OperationIProps {
  crypto?: CryptoCompareData;
}

export const OperationButton = ({ crypto }: OperationIProps) => {
  const navigate = useNavigate();
  const [operationButtom, setOperationButtom] = useState<OperationButtonConfig[]>([]);
  const { currency } = useStoreCrypto();
  const { currentWallet, isAuthenticated } = useStoreAutheticated();
  const showSwap = useBreakpointValue({
    base: false,
    md: true,
  });
  const location = useLocation();
  const { displayToast } = useToastNotification();
  const pathLocation = location.pathname.includes('/detail');

  useEffect(() => {
    if (pathLocation) {
      const operation = OPERATION_BUTTONS.filter((data) => data.text !== 'history');
      setOperationButtom(operation);
    } else {
      setOperationButtom(OPERATION_BUTTONS);
    }
  }, []);

  const calculateMounters = (coin: CryptoCompareData) => {
    const coinValue = currentWallet?.cryptoCurrency[coin.CoinInfo.Name];
    const totalValue = coinValue! * parseFloat((coin.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
    return totalValue;
  };

  const handleNavigate = (route: string, text: string) => {
    if (!isAuthenticated) {
      navigate(ROUTES.USER_SIGNIN);
      return;
    }

    if (crypto && pathLocation && text === 'send') {
      const coinCrypto = currentWallet?.cryptoCurrency[crypto.CoinInfo.Name];
      if (!coinCrypto || coinCrypto <= 0) {
        displayToast('Atención', 'Saldo insuficiente.', 'warning', 2000);
        return;
      }
      navigate(`${ROUTES.OPERATIONS_SEND_TRANSFER_CRYPTO}`, {
        state: {
          crypto: crypto,
          maxAmount: calculateMounters(crypto),
          symbol: crypto?.DISPLAY?.[currency]?.TOSYMBOL,
        },
      });
    } else {
      navigate(route);
    }
  };

  return (
    <Stack spacing={2}>
      <Flex alignItems="center" justifyContent="space-between">
        {operationButtom
          .filter(({ id }) => showSwap || id !== 5)
          .map(({ icon, route, text }) => (
            <Flex key={text} direction="column" alignItems="center" width="fit-content">
              <Button
                onClick={() => handleNavigate(route, text)}
                bg="#1e59ea"
                borderRadius="full"
                width={{ base: '48px', md: '52px' }}
                height={{ base: '48px', md: '52px' }}
                _hover={{ bg: '#66ccff', cursor: 'pointer' }}
                _active={{ bg: '#007bff' }}
              >
                <Icon as={icon} boxSize={{ base: 8, md: 9 }} color={'#FFF'} />
              </Button>
              <Text textTransform={'capitalize'} textAlign={'center'}>
                {text}
              </Text>
            </Flex>
          ))}
      </Flex>
    </Stack>
  );
};
