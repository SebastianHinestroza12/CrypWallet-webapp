import React from 'react';
import { Box, Flex, Text, Icon, VStack, useColorModeValue } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import { TransactionUserIProps } from '../../interfaces';
import { useStoreAutheticated } from '../../stores/authentication';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

type TransactionHistoryProps = {
  transactions: TransactionUserIProps[];
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const { currentWallet } = useStoreAutheticated();
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

  const TEXT_COLOR = useColorModeValue('gray.600', 'gray.500');

  return (
    <VStack spacing={4} align="stretch">
      {transactions.map((transaction) => {
        const renderIcony =
          transaction.type_transaction === 'Send' &&
          transaction.destination === currentWallet?.address
            ? 'receive'
            : transaction.type_transaction.toLowerCase();

        return (
          <Flex
            key={transaction.id}
            p={4}
            onClick={() =>
              navigate(`${ROUTES.TRANSACTION_DETAIL_OPERATION}`, {
                state: { transaction, renderIcony },
              })
            }
            borderWidth={1}
            borderRadius="md"
            align="center"
            justify="space-between"
            cursor={'pointer'}
          >
            <Flex align="center">
              {renderIcon(renderIcony)}
              <Box ml={3}>
                <Text fontWeight="bold">{transaction.name_cryptocurrency}</Text>
                <Text fontSize="sm" color={TEXT_COLOR}>
                  {transaction.formatted_date}
                </Text>
              </Box>
            </Flex>
            <Flex direction="column" align="flex-end">
              <Text fontWeight="bold">
                {transaction.amount} {transaction.symbol}
              </Text>
              <Text fontSize="sm" color={TEXT_COLOR}>
                {renderIcony.toUpperCase()}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
};
