import { Box, Flex, Stack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useStoreAutheticated } from '../../stores/authentication';
import { formatDate } from '../../utils';
import { useTranslation } from 'react-i18next';

export const TransactionDetails = () => {
  const location = useLocation();
  const {
    data: {
      cryptoShippingdata,
      data: { dataTransfer },
    },
  } = location.state || {};

  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const { currentWallet } = useStoreAutheticated();
  const { t } = useTranslation();

  return (
    <Box maxW="md" mx="auto" p={5} boxShadow="md" borderRadius="md" mb={5} bg={BG_COLOR}>
      <Flex justifyContent="initial" alignItems="center" mb={4}>
        <Icon as={FaCheckCircle} w={12} h={12} color="green.400" />
        <Text ml={3} fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }}>
          {t('send.view_details.title')}
        </Text>
      </Flex>
      <Stack spacing={3}>
        <Text fontWeight="bold">{t('send.view_details.number_reference')}</Text>
        <Text>{dataTransfer?.referenceNumber}</Text>

        <Text fontWeight="bold">{t('send.view_details.sender')}:</Text>
        <Text>{currentWallet?.address}</Text>

        <Text fontWeight="bold">{t('send.view_details.recipient')}:</Text>
        <Text>{cryptoShippingdata?.destinationWalletAddress}</Text>

        <Text fontWeight="bold">{t('send.view_details.amount')}:</Text>
        <Text>
          {dataTransfer?.amount} {dataTransfer?.cryptocurrencyId}
        </Text>

        <Text fontWeight="bold">{t('send.view_details.date')}:</Text>
        <Text>{formatDate(dataTransfer?.date)}</Text>

        {dataTransfer?.description !== '' && (
          <Box>
            <Text fontWeight="bold">{t('send.view_details.description')}:</Text>
            <Text>{dataTransfer?.description}</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
