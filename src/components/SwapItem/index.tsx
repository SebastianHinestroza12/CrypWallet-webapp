/* eslint-disable no-unused-vars */
import { Flex, Stack, useColorModeValue, Text, Image, Box, Input } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { AiOutlineSwap } from 'react-icons/ai';
import { PiApproximateEquals } from 'react-icons/pi';

interface SwapItemIProps {
  title: string;
  pathImage: string;
  name: string;
  unitAmount: number;
  needToBuy?: boolean;
  symbol: string;
  amountCrypto?: string;
  equalAmount?: string;
  symbolCurrency: string;
  showSwapIcon: boolean;
  renderCalculateAmount?: boolean;
  totalSwap?: string;
  symbolFrom?: string;
  isInput?: boolean;
  valueInput?: string;
  reverseCoin?: () => void;
  handleBuyCrypto?: () => void;
  handleInputChange?: (value: string) => void;
  changeCrypto?: () => void;
}

export const SwapItem = ({
  title,
  isInput,
  pathImage,
  name,
  unitAmount,
  symbol,
  amountCrypto,
  equalAmount,
  symbolCurrency,
  needToBuy,
  showSwapIcon,
  totalSwap,
  symbolFrom,
  renderCalculateAmount,
  valueInput,
  handleInputChange,
  handleBuyCrypto,
  reverseCoin,
  changeCrypto,
}: SwapItemIProps) => {
  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const BORDER_COLOR = useColorModeValue('gray.200', '#101010');

  return (
    <Box bg={BG_COLOR} borderRadius={'lg'} position={'relative'} boxShadow={'2xl'}>
      <Stack spacing={5} p={3}>
        {showSwapIcon && (
          <Box
            p={2}
            cursor={'pointer'}
            bg={'#000'}
            borderRadius={'full'}
            width={'max-content'}
            position="absolute"
            top="-30px"
            left="50%"
            transform="translateX(-50%)"
            onClick={reverseCoin}
          >
            <Box transform="rotate(90deg)">
              <AiOutlineSwap size={30} color="#FFF" />
            </Box>
          </Box>
        )}
        <Flex justifyContent={'space-between'}>
          <Flex
            alignItems={'center'}
            cursor={'pointer'}
            onClick={changeCrypto}
            _hover={{ bg: BORDER_COLOR }}
          >
            <Text textTransform={'capitalize'} mr={2}>
              {title}
            </Text>
            <Image
              src={`https://www.cryptocompare.com${pathImage}`}
              boxSize="20px"
              borderRadius="full"
              alt="Logo"
            />
            <Text ml={2}>{name}</Text>
            <MdArrowDropDown />
          </Flex>
          <Flex alignItems={'center'}>
            <Text fontSize={'small'} textAlign={'end'} color={'gray'}>
              {unitAmount}
            </Text>
            {needToBuy && (
              <Text
                onClick={handleBuyCrypto}
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
              src={`https://www.cryptocompare.com${pathImage}`}
              boxSize="35px"
              borderRadius="full"
              alt="Logo"
            />
            <Text ml={2} textTransform={'uppercase'}>
              {symbol}
            </Text>
          </Flex>
          <Box>
            {isInput ? (
              <Input
                fontWeight={'bold'}
                fontSize={'lg'}
                textAlign={'end'}
                type="text"
                step={'any'}
                variant="unstyled"
                value={valueInput}
                onChange={(e) => handleInputChange && handleInputChange(e.target.value)}
              />
            ) : (
              <Text textAlign={'end'} fontWeight={'bold'} fontSize={'lg'}>
                {amountCrypto}
              </Text>
            )}
            {equalAmount && (
              <Flex justifyContent={'end'} alignItems={'center'}>
                <Box>
                  <PiApproximateEquals color={'gray'} />
                </Box>
                <Text fontSize={'small'} textAlign={'end'} color={'gray'}>
                  {symbolCurrency}
                  {equalAmount}
                </Text>
              </Flex>
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
          <Text color={'gray'}>
            {valueInput} {symbolFrom}
          </Text>
          <Box mx={1}>
            <PiApproximateEquals color={'gray'} />
          </Box>
          <Text color={'gray'}>
            {totalSwap} {symbol}
          </Text>
          <Box ml={2}>
            <AiOutlineSwap color={'gray'} />
          </Box>
        </Flex>
      )}
    </Box>
  );
};
