/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { TransactionResult } from '../../components/TransactionResult';
import { useLocation } from 'react-router-dom';
import { useStorePaymentMethods } from '../../stores/paymentMethods';
import { PaymentService } from '../../services/payment.service';
import { useToastNotification } from '../../hooks/useToastNotification';
import { WalletServices } from '../../services/wallet.service';
import { useStoreAutheticated } from '../../stores/authentication';
import { WalletsIProps } from '../../interfaces';
import Confetti from 'react-confetti';
import { TransactionService } from '../../services/transactions.service';
import { useTranslation } from 'react-i18next';

export const Success = () => {
  const location = useLocation();
  const { saveDataPayment, setSaveDataPayment, setPaymentMethods } = useStorePaymentMethods();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const { displayToast } = useToastNotification();
  const [confettiDimension, setConfettiDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const {
    currentWallet,
    authenticatedUser: { id },
    addWallet,
    setCurrentWallet,
    setTransactions,
  } = useStoreAutheticated();
  const { t } = useTranslation();

  useEffect(() => {
    const createTransaction = async () => {
      try {
        if (from === 'stripe' || from === 'mercadoPago') {
          if (saveDataPayment !== null) {
            const { status } = await PaymentService.handlePaymentIntent({
              amount: saveDataPayment.amount,
              cryptoID: saveDataPayment.cryptoID,
              idPayment: saveDataPayment.idPayment,
              paymentGateway: saveDataPayment.paymentGateway,
              originWalletId: saveDataPayment.originWalletId,
            });

            if (status === 201) {
              displayToast(
                t('buy.success.alert_success.alert_one.title'),
                t('buy.success.alert_success.alert_one.description'),
                'success',
              );

              setSaveDataPayment(null);
              setPaymentMethods('');

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
          }
        }
      } catch (error) {
        displayToast(
          t('buy.success.alert_success.alert_two.title'),
          t('buy.success.alert_success.alert_two.description'),
          'info',
        );
      }
    };
    createTransaction();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setConfettiDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box>
      <Confetti width={confettiDimension.width} height={confettiDimension.height} recycle={false} />
      <TransactionResult
        title={t('buy.success.title')}
        message={t('buy.success.description')}
        status="success"
      />
    </Box>
  );
};
