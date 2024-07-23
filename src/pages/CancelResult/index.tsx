import { Box } from '@chakra-ui/react';
import { TransactionResult } from '../../components/TransactionResult';

export const Cancel = () => {
  return (
    <Box>
      <TransactionResult
        title="Payment Cancelled"
        message="Your payment was cancelled. Please try again if you wish to complete the transaction."
        status="cancel"
      />
    </Box>
  );
};
