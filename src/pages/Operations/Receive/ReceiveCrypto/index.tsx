import { useState, ChangeEvent } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useClipboard,
  Image,
  Tag,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { CopyIcon, EditIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useStoreAutheticated } from '../../../../stores/authentication';
import { useStoreCrypto } from '../../../../stores/cryptocurrencies';
import { useToastNotification } from '../../../../hooks/useToastNotification';
import { formatCurrency } from '../../../../utils';
import { SupportedCurrency } from '../../../../constants';

export const ReceiveCrypto = () => {
  const { currentWallet } = useStoreAutheticated();
  const { currency } = useStoreCrypto();
  const { onCopy } = useClipboard(currentWallet?.address as string);
  const [amount, setAmount] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const { displayToast } = useToastNotification();
  const {
    state: { crypto, symbol },
  } = useLocation();

  const currencyConversion = amount * parseFloat((crypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2));
  const amountValue = amount > 0 ? `?amount=${amount}` : '';
  const qrValue = `${currentWallet?.address}${amountValue}`;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleCopy = () => {
    onCopy();
    displayToast('Address copied to clipboard', '', 'success', 1000);
  };

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      mx={'auto'}
      bg={BG_COLOR}
      boxShadow="lg"
      maxWidth="500px"
    >
      <Flex alignItems="center" justifyContent={'center'} mb={4}>
        <Box>
          <Image
            boxSize={{ base: '35px', md: '50px' }}
            borderRadius="full"
            src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
            alt={crypto.CoinInfo.FullName}
          />
        </Box>
        <Flex>
          <Text fontSize={{ base: 'lg', md: '2xl' }} ml={2}>
            {crypto.CoinInfo.Name}
          </Text>
          <Tag
            ml={1}
            borderRadius={'full'}
            bg={useColorModeValue('gray.700', '#101010')}
            size={'md'}
            variant="solid"
          >
            COIN
          </Tag>
        </Flex>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Box width="100%" display="flex" justifyContent="center">
            <QRCode value={qrValue} style={{ width: '100%', height: 'auto' }} />
          </Box>
          <Text mt={2} fontSize="sm" textAlign="center">
            {currentWallet?.address}
          </Text>
        </Box>
        {amount > 0 && (
          <Flex>
            <Text fontSize="md" fontWeight="bold" textAlign={'center'}>
              Amount: {amount} {crypto.CoinInfo.Name}
            </Text>
            <Text
              size={'sm'}
              ml={2}
            >{`= ${symbol}${formatCurrency(currencyConversion, currency as SupportedCurrency)}`}</Text>
          </Flex>
        )}
        <Flex justify="space-around">
          <Button leftIcon={<CopyIcon />} onClick={handleCopy} aria-label="Copy address">
            Copy
          </Button>
          <Button leftIcon={<EditIcon />} onClick={onOpen}>
            Set Amount
          </Button>
        </Flex>
      </VStack>
      {/* Modal para establecer el monto */}
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxWidth="400px" borderRadius="md" bg={BG_COLOR} py={5}>
            <ModalHeader>Set Amount</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="amount" mb={4}>
                <FormLabel>Amount</FormLabel>
                <Input type="number" onChange={handleAmountChange} placeholder="Enter amount" />
              </FormControl>
              <Button
                bg={'#1e59ea'}
                _hover={{ bg: 'blue.500' }}
                color={'#FFF'}
                onClick={onClose}
                w="full"
              >
                Set Amount
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
