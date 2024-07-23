import { Box, Flex, Stack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useStoreAutheticated } from '../../stores/authentication';
import { formatDate } from '../../utils';

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

  return (
    <Box maxW="md" mx="auto" p={5} boxShadow="md" borderRadius="md" mb={5} bg={BG_COLOR}>
      <Flex justifyContent="initial" alignItems="center" mb={4}>
        <Icon as={FaCheckCircle} w={12} h={12} color="green.400" />
        <Text ml={3} fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }}>
          Transaction Details
        </Text>
      </Flex>
      <Stack spacing={3}>
        <Text fontWeight="bold">Reference Numero:</Text>
        <Text>{dataTransfer?.referenceNumber}</Text>

        <Text fontWeight="bold">Sender Address:</Text>
        <Text>{currentWallet?.address}</Text>

        <Text fontWeight="bold">Recipient Address:</Text>
        <Text>{cryptoShippingdata?.destinationWalletAddress}</Text>

        <Text fontWeight="bold">Amount:</Text>
        <Text>
          {dataTransfer?.amount} {dataTransfer?.cryptocurrencyId}
        </Text>

        <Text fontWeight="bold">Date:</Text>
        <Text>{formatDate(dataTransfer?.date)}</Text>

        {dataTransfer?.description !== '' && (
          <Box>
            <Text fontWeight="bold">Description:</Text>
            <Text>{dataTransfer?.description}</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
