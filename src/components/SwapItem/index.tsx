import { Flex, Stack, useColorModeValue, Text, Image, Box } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { AiOutlineSwap } from 'react-icons/ai';

interface SwapItemIProps {
  title: string;
  urlImage: string;
  name: string;
  unitAmount: number;
  needToBuy: boolean;
  symbol: string;
  amountCrypto: number;
  equalAmount: number;
  symbolCurrency: string;
  showSwapIcon: boolean;
  renderCalculateAmount: boolean;
  totalSwap: number;
  symbolFrom: string;
}

export const SwapItem = ({
  title,
  urlImage,
  name,
  unitAmount,
  symbol,
  amountCrypto,
  equalAmount,
  symbolCurrency,
  needToBuy,
  showSwapIcon = true,
  totalSwap,
  symbolFrom,
  renderCalculateAmount,
}: SwapItemIProps) => {
  const BG_COLOR = useColorModeValue('gray.200', '#171717');
  const BORDER_COLOR = useColorModeValue('#FFF', '#101010');

  return (
    <Box bg={BG_COLOR} borderRadius={'lg'} position={'relative'}>
      <Stack spacing={5} p={3}>
        {showSwapIcon && (
          <Box
            p={2}
            cursor={'pointer'}
            bg={'#000'}
            borderRadius={'full'}
            width={'max-content'}
            position="absolute"
            top="-27px"
            left="50%"
            transform="translateX(-50%)"
          >
            <AiOutlineSwap size={30} />
          </Box>
        )}
        <Flex justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Text textTransform={'capitalize'} mr={2}>
              {title || 'To'}
            </Text>
            <Image
              src={urlImage || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'}
              boxSize="20px"
              borderRadius="full"
              alt="Logo"
            />
            <Text ml={2}>{name || 'Bitcoin'}</Text>
            <MdArrowDropDown />
          </Flex>
          <Flex alignItems={'center'}>
            <Text>{unitAmount || 0}</Text>
            {needToBuy && (
              <Text
                color="#008000"
                bg={'#122d21'}
                borderRadius={'lg'}
                px={1}
                textTransform={'capitalize'}
                ml={2}
              >
                buy
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Image
              src={urlImage || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'}
              boxSize="35px"
              borderRadius="full"
              alt="Logo"
            />
            <Text ml={2} textTransform={'uppercase'}>
              {symbol || 'BTC'}
            </Text>
          </Flex>
          <Box>
            <Text textAlign={'end'}>{amountCrypto || 0}</Text>
            {!!equalAmount && (
              <Text fontSize={'small'}>
                {'='} {symbolCurrency}
                {equalAmount || 0}
              </Text>
            )}
          </Box>
        </Flex>
      </Stack>
      {renderCalculateAmount && (
        <Flex
          borderTop="1px solid"
          borderTopColor={BORDER_COLOR}
          mt={4}
          p={3}
          alignItems={'center'}
        >
          <Text>{`1 ${symbolFrom || 'BTC'} = ${totalSwap || 11.43543} ${symbol || 'BNB'} `}</Text>
          <Box ml={2}>
            <AiOutlineSwap />
          </Box>
        </Flex>
      )}
    </Box>
  );
};
