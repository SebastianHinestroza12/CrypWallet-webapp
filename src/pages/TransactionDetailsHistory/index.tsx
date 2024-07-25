import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  HStack,
  IconButton,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon as IconifyIcon } from '@iconify/react';

export const TransactionDetailsHistory = () => {
  const {
    state: { transaction, renderIcony },
  } = useLocation();
  const navigate = useNavigate();

  const renderIcon = (type_transaction: string) => {
    switch (type_transaction) {
      case 'send':
        return <Icon as={IconifyIcon} icon={'icomoon-free:arrow-down'} color="red" boxSize={7} />;
      case 'receive':
        return <Icon as={IconifyIcon} icon={'icomoon-free:arrow-up'} color="blue" boxSize={7} />;
      case 'buy':
        return <Icon as={IconifyIcon} icon={'icomoon-free:arrow-up'} color="green" boxSize={7} />;
      case 'sell':
        return (
          <Icon
            as={IconifyIcon}
            icon={'clarity:circle-arrow-solid'}
            color="orange.500"
            boxSize={7}
          />
        );
      default:
        return (
          <Icon
            as={IconifyIcon}
            icon={'emojione-monotone:down-arrow'}
            color="gray.500"
            boxSize={7}
          />
        );
    }
  };

  return (
    <Stack spacing={7}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading textAlign={'center'} size="md">
          Detalles Transaction
        </Heading>
        <IconButton
          icon={<IconifyIcon icon="mdi:arrow-left" width="24" height="24" />}
          variant="outline"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        />
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        mb={{ base: 4, md: 0 }}
        boxShadow="md"
      >
        <VStack align="start" spacing={4}>
          <HStack spacing={3}>
            {renderIcon(renderIcony)}
            <Text fontWeight="bold" fontSize="xl">
              {renderIcony.toUpperCase()}
            </Text>
          </HStack>
          <Flex direction="column">
            <Text fontWeight="bold">Payment ID:</Text>
            <Text whiteSpace="normal" wordBreak="break-word">
              {transaction.idPayment || 'N/A'}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Origin:</Text>
            <Text whiteSpace="normal" wordBreak="break-word">
              {transaction.origin}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Destination:</Text>
            <Text whiteSpace="normal" wordBreak="break-word">
              {transaction.destination || 'N/A'}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Amount:</Text>
            <Text>{`${transaction.amount} ${transaction.symbol}`}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Cryptocurrency:</Text>
            <Text>{transaction.name_cryptocurrency}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Reference Number:</Text>
            <Text>{transaction.referenceNumber}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Payment Gateway:</Text>
            <Text textTransform={'capitalize'}>{transaction.paymentGateway || 'N/A'}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">User Origin:</Text>
            <HStack>
              <Icon as={FiUser} />
              <Text>{transaction.user_origin}</Text>
            </HStack>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold" whiteSpace="normal" wordBreak="break-word">
              User Destination:
            </Text>
            <HStack>
              <Icon as={FiUser} />
              <Text whiteSpace="normal" wordBreak="break-word">
                {transaction.user_destination || 'N/A'}
              </Text>
            </HStack>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Date:</Text>
            <HStack>
              <Icon as={FiCalendar} />
              <Text>{transaction.formatted_date}</Text>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Stack>
  );
};
