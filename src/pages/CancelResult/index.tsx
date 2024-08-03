import { Box } from '@chakra-ui/react';
import { TransactionResult } from '../../components/TransactionResult';
import { useTranslation } from 'react-i18next';

export const Cancel = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <TransactionResult
        title={t('buy.cancel.title')}
        message={t('buy.cancel.description')}
        status="cancel"
      />
    </Box>
  );
};
