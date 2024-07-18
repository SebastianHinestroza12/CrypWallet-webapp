import { Box } from '@chakra-ui/react';
import { useStoreOperations } from '../../../../stores/operations';
import { TransferCrypto } from '../TranferCrypto';
import { ConfirmTransfer } from '../ConfirmTransfer';

export const TransferStep = () => {
  const { transferStep } = useStoreOperations();
  return <Box>{transferStep === 1 ? <TransferCrypto /> : <ConfirmTransfer />}</Box>;
};
