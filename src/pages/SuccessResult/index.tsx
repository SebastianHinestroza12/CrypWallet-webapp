/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import { TransactionResult } from '../../components/TransactionResult';
import { useLocation } from 'react-router-dom';
import { useStorePaymentMethods } from '../../stores/paymentMethods';
import { useEffect } from 'react';

export const Success = () => {
  const location = useLocation();
  const { saveDataPayment } = useStorePaymentMethods();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');

  useEffect(() => {
    const createTransaction = async () => {
      if (from === 'stripe') {
        console.log('Navigated from Stripe checkout');
        console.log(saveDataPayment);
      }
    };
    createTransaction();
  }, []);

  return (
    <Box>
      <TransactionResult
        title="Payment Successful"
        message="Your payment has been processed successfully."
        status="success"
      />
    </Box>
  );
};
