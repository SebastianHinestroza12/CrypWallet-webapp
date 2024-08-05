import { useState } from 'react';
import { Box, Flex, Text, Icon, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import { TransactionUserIProps } from '../../interfaces';
import { useStoreAutheticated } from '../../stores/authentication';
import { DetailHistoryModal } from '../../components/DetailHistoryModal';
import { useTranslation } from 'react-i18next';
interface TransactionHistoryProps {
  transactions: TransactionUserIProps[];
  showRemoveButton?: boolean;
}

export const TransactionHistory = ({ transactions, showRemoveButton }: TransactionHistoryProps) => {
  const { currentWallet, removeNotifications } = useStoreAutheticated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionUserIProps | null>(
    null,
  );
  const { t } = useTranslation();

  const renderIcon = (type_transaction: string) => {
    switch (type_transaction) {
      case 'send':
        return <Icon as={IconifyIcon} icon={'formkit:arrowdown'} color="red" boxSize={7} />;
      case 'receive':
        return <Icon as={IconifyIcon} icon={'formkit:arrowup'} color="blue" boxSize={7} />;
      case 'buy':
        return <Icon as={IconifyIcon} icon={'formkit:arrowup'} color="green" boxSize={7} />;
      case 'swap':
        return (
          <Icon
            as={IconifyIcon}
            icon={'fluent:arrow-swap-28-filled'}
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

  const renderIconDetail = (type: string) => {
    return renderIcon(type);
  };

  const handleOpenModal = (transaction: TransactionUserIProps) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const handleRemoveNotification = (id: number) => {
    removeNotifications(id);
  };

  const TEXT_COLOR = useColorModeValue('gray.600', 'gray.500');

  return (
    <Stack spacing={3} align="stretch">
      {transactions.map((transaction) => {
        const renderIcony =
          transaction.type_transaction === 'Send' &&
          transaction.destination === currentWallet?.address
            ? 'receive'
            : transaction.type_transaction.toLowerCase();
        const amountTransactions =
          transaction.type_transaction === 'Swap' ? transaction.amountFrom : transaction.amount;

        return (
          <Flex key={transaction.id} justifyContent={'space-between'} alignItems={'center'}>
            <Flex
              p={4}
              flex={1}
              onClick={() => handleOpenModal(transaction)}
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
                  {amountTransactions} {transaction.symbol}
                </Text>
                <Text fontSize="sm" color={TEXT_COLOR} textTransform={'uppercase'}>
                  {t(`home.operations.${renderIcony}`)}
                </Text>
              </Flex>
            </Flex>
            <Box>
              {showRemoveButton && (
                <Icon
                  as={IconifyIcon}
                  onClick={() => handleRemoveNotification(transaction.id)}
                  icon={'material-symbols-light:delete-outline'}
                  color="red"
                  boxSize={7}
                  ml={3}
                  _hover={{ transform: 'scale(1.1)' }}
                  cursor={'pointer'}
                />
              )}
            </Box>
          </Flex>
        );
      })}
      {selectedTransaction && (
        <DetailHistoryModal
          isOpen={isOpen}
          onClose={onClose}
          transaction={selectedTransaction}
          renderIcony={
            selectedTransaction.type_transaction === 'Send' &&
            selectedTransaction.destination === currentWallet?.address
              ? 'receive'
              : selectedTransaction.type_transaction.toLowerCase()
          }
          renderIconDetail={renderIconDetail}
        />
      )}
    </Stack>
  );
};
