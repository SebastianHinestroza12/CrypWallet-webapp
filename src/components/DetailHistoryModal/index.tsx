/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  HStack,
  Icon,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { TransactionUserIProps } from '../../interfaces';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionUserIProps;
  renderIcony: string;
  renderIconDetail: (type: string) => JSX.Element;
}

export const DetailHistoryModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  transaction,
  renderIcony,
  renderIconDetail,
}) => {
  const BG = useColorModeValue('#FFF', '#171717');
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: '4', md: '0' }} bg={BG} maxW={{ md: '70%' }} maxH={'90vh'}>
        <ModalHeader> {t('history_modal_transaction.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box pb={2}>
            {transaction.type_transaction === 'Swap' ? (
              <Stack align="start">
                <HStack spacing={2}>
                  {renderIconDetail(renderIcony)}
                  <Text fontWeight="bold" fontSize="md" textTransform={'uppercase'}>
                    {t(`home.operations.${renderIcony}`)}
                  </Text>
                </HStack>

                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.swap.amount_from')}:
                  </Text>
                  <Text>{`${transaction.amountFrom} ${transaction.cryptoFromId}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.swap.amount_to')}:
                  </Text>
                  <Text>{`${transaction.amountTo} ${transaction.cryptoToId}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.number_reference')} :
                  </Text>
                  <Text>{transaction.referenceNumber}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.date')}:
                  </Text>
                  <HStack>
                    <Icon as={FiCalendar} />
                    <Text>{transaction.formatted_date}</Text>
                  </HStack>
                </Flex>
              </Stack>
            ) : (
              <Stack align="start">
                <HStack spacing={2}>
                  {renderIconDetail(renderIcony)}
                  <Text fontWeight="bold" fontSize="md" textTransform={'uppercase'}>
                    {t(`home.operations.${renderIcony}`)}
                  </Text>
                </HStack>

                {transaction.idPayment && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      {t('history_modal_transaction.others.id_payment')}:
                    </Text>
                    <Text whiteSpace="normal" wordBreak="break-word">
                      {transaction.idPayment}
                    </Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.others.sender_wallet')}:
                  </Text>
                  <Text whiteSpace="normal" wordBreak="break-word">
                    {transaction.origin}
                  </Text>
                </Flex>
                {transaction.destination && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      {t('history_modal_transaction.others.recipient_wallet')}:
                    </Text>
                    <Text whiteSpace="normal" wordBreak="break-word">
                      {transaction.destination}
                    </Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.others.amount')}:
                  </Text>
                  <Text>{`${transaction.amount} ${transaction.symbol}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.others.crypto')}:
                  </Text>
                  <Text>{transaction.name_cryptocurrency}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.number_reference')} :
                  </Text>
                  <Text>{transaction.referenceNumber}</Text>
                </Flex>
                {transaction.paymentGateway && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      {t('history_modal_transaction.others.payment_method')}:
                    </Text>
                    <Text textTransform={'capitalize'}>{transaction.paymentGateway}</Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.others.sender')}:
                  </Text>
                  <HStack>
                    <Icon as={FiUser} />
                    <Text>{transaction.user_origin}</Text>
                  </HStack>
                </Flex>
                {transaction.user_destination && (
                  <Flex>
                    <Text fontWeight="bold" whiteSpace="normal" mr={2} wordBreak="break-word">
                      {t('history_modal_transaction.others.recipient')}:
                    </Text>
                    <HStack>
                      <Icon as={FiUser} />
                      <Text whiteSpace="normal" wordBreak="break-word">
                        {transaction.user_destination ?? 'N/A'}
                      </Text>
                    </HStack>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {t('history_modal_transaction.date')}:
                  </Text>
                  <HStack>
                    <Icon as={FiCalendar} />
                    <Text>{transaction.formatted_date}</Text>
                  </HStack>
                </Flex>
              </Stack>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
