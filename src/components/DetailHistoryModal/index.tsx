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
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: '4', md: '0' }} bg={BG} maxW={{ md: '70%' }} maxH={'90vh'}>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box pb={2}>
            {transaction.type_transaction === 'Swap' ? (
              <Stack align="start">
                <HStack spacing={2}>
                  {renderIconDetail(renderIcony)}
                  <Text fontWeight="bold" fontSize="xl">
                    {renderIcony.toUpperCase()}
                  </Text>
                </HStack>

                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    From Amount:
                  </Text>
                  <Text>{`${transaction.amountFrom} ${transaction.cryptoFromId}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    To Amount:
                  </Text>
                  <Text>{`${transaction.amountTo} ${transaction.cryptoToId}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Reference No. :
                  </Text>
                  <Text>{transaction.referenceNumber}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Date:
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
                  <Text fontWeight="bold" fontSize="xl">
                    {renderIcony.toUpperCase()}
                  </Text>
                </HStack>

                {transaction.idPayment && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      Payment ID:
                    </Text>
                    <Text whiteSpace="normal" wordBreak="break-word">
                      {transaction.idPayment}
                    </Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Sender Wallet:
                  </Text>
                  <Text whiteSpace="normal" wordBreak="break-word">
                    {transaction.origin}
                  </Text>
                </Flex>
                {transaction.destination && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      Recipient Wallet:
                    </Text>
                    <Text whiteSpace="normal" wordBreak="break-word">
                      {transaction.destination}
                    </Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Amount:
                  </Text>
                  <Text>{`${transaction.amount} ${transaction.symbol}`}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Cryptocurrency:
                  </Text>
                  <Text>{transaction.name_cryptocurrency}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Reference No. :
                  </Text>
                  <Text>{transaction.referenceNumber}</Text>
                </Flex>
                {transaction.paymentGateway && (
                  <Flex>
                    <Text fontWeight="bold" mr={2}>
                      Payment Method:
                    </Text>
                    <Text textTransform={'capitalize'}>{transaction.paymentGateway}</Text>
                  </Flex>
                )}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    Sender:
                  </Text>
                  <HStack>
                    <Icon as={FiUser} />
                    <Text>{transaction.user_origin}</Text>
                  </HStack>
                </Flex>
                {transaction.user_destination && (
                  <Flex>
                    <Text fontWeight="bold" whiteSpace="normal" mr={2} wordBreak="break-word">
                      Recipient:
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
                    Date:
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
