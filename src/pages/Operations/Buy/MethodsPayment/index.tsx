import { Flex, Text, Stack, Button } from '@chakra-ui/react';
import { PaymentCard } from '../../../../components/paymentCard';
import { useStorePaymentMethods } from '../../../../stores/paymentMethods';
import { PAYMENT_METHODS, ROUTES } from '../../../../constants';
import { useNavigate, useLocation } from 'react-router-dom';

export const PaymentMethod = () => {
  const { selectedPaymentMethod } = useStorePaymentMethods();
  const {
    state: { crypto, symbol },
  } = useLocation();
  const navigate = useNavigate();

  return (
    <Stack spacing={8} p={5}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Select a Payment Gateway
      </Text>
      <Text fontSize="md" textAlign="center" color="gray.500">
        Please select a payment gateway to proceed with your purchase.
      </Text>
      <Stack spacing={7} display="flex" justify="center" align="center" flexDirection={'column'}>
        {PAYMENT_METHODS.map(({ icon, label, method, color }) => (
          <PaymentCard key={label} icon={icon} label={label} color={color} method={method} />
        ))}
      </Stack>
      {selectedPaymentMethod !== '' && (
        <Flex justifyContent={'center'}>
          <Button
            rounded={'full'}
            fontWeight={'bold'}
            color={'#FFF'}
            bg={'#1E59EA'}
            _hover={{ bg: '#0039A0', cursor: 'pointer' }}
            _active={{ bg: '#0039A0' }}
            size={{ base: 'md', md: 'lg' }}
            mx={2}
            onClick={() =>
              navigate(`${ROUTES.OPERATIONS_BUY_CRYPTO_WITH_GATEWAY}`, {
                state: {
                  crypto,
                  symbol,
                },
              })
            }
          >
            Continuar
          </Button>
        </Flex>
      )}
    </Stack>
  );
};
