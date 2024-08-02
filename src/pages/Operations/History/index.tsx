/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Box, Stack, Heading } from '@chakra-ui/react';
import { TransactionHistory } from '../../../components/TransactionHistory';
import { useStoreAutheticated } from '../../../stores/authentication';
import { TransactionUserIProps } from '../../../interfaces';
import { EmptyTransaction } from '../../../components/EmptyTransactions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export const AllTransactions = () => {
  const { transactions, currentWallet, isAuthenticated } = useStoreAutheticated();
  const [transactionWallet, setTransactionWallet] = useState<TransactionUserIProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentWallet && isAuthenticated) {
      setTransactionWallet(
        transactions.filter(
          (transaction) =>
            transaction.destination === currentWallet.address ||
            transaction.origin === currentWallet.address,
        ),
      );
    }
  }, []);

  const handleEventClick = () => {
    navigate(`${ROUTES.OPERATIONS_BUY_CRYPTO}`);
  };

  return (
    <Stack spacing={4}>
      {transactionWallet.length === 0 ? (
        <EmptyTransaction coinName="Cryptocurrency" eventClick={handleEventClick} />
      ) : (
        <Stack spacing={8}>
          <Heading as="h2" size="lg" textAlign="center">
            Operation Summary
          </Heading>
          <MotionStack
            spacing={{ base: 4, md: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Box pb={4}>
              <TransactionHistory transactions={transactionWallet} />
            </Box>
          </MotionStack>
        </Stack>
      )}
    </Stack>
  );
};
