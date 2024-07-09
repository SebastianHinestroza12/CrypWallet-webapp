import { useState } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Button } from '@chakra-ui/react';
import { FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useStoreAutheticated } from '../../stores/authentication';
import { ROUTES, SupportedCurrency } from '../../constants';
import { fetchCryptoCompareData, formatCurrency } from '../../utils';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const TotalCash = () => {
  const bg = useColorModeValue('gray.100', '#171717');
  const bgWallet = useColorModeValue('gray.300', '#101010');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { currency, setCurrentCrypto } = useStoreCrypto();
  const { isAuthenticated, currentWallet } = useStoreAutheticated();
  const { isDataVisible, setDataVisible, totalCash, symbol, totalPercentaje, isPositive } =
    useStoreVisibilityData();

  const handleDataVisible = () => {
    if (isAuthenticated) {
      setDataVisible();
      return;
    }
    navigation(ROUTES.USER_SIGNIN);
  };

  const onRefresh = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await fetchCryptoCompareData(currency);
      setCurrentCrypto(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg={bg} p={3} borderRadius="md" width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          _hover={{ bg: bgWallet, cursor: 'pointer' }}
          onClick={() => navigation(ROUTES.WALLETS)}
          p={2}
          borderRadius={'full'}
        >
          <Text fontSize="md" fontWeight="bold" textAlign={'center'}>
            {currentWallet?.name ?? 'Wallets'}
          </Text>
          <Icon as={IoMdArrowDropdown} boxSize={6} />
        </Box>
        <Button
          rounded={'full'}
          size={'md'}
          fontWeight={'normal'}
          px={3}
          color={'#FFF'}
          bg={'#1E59EA'}
          isLoading={isLoading}
          _hover={{ bg: '#007bff', cursor: 'pointer' }}
          onClick={onRefresh}
        >
          <Text mr={2} cursor="pointer">
            Actualizar
          </Text>
          <Icon as={FaSync} cursor="pointer" />
        </Button>
      </Flex>

      <Flex alignItems={'center'} px={2}>
        {isDataVisible ? (
          <Text mr={3} fontSize="2xl" fontWeight="bold" mb={1}>
            {`${symbol} ${formatCurrency(totalCash, currency as SupportedCurrency)}`}
          </Text>
        ) : (
          <Icon boxSize={12} mr={4} as={PiDotsThreeOutlineFill} />
        )}
        <Icon
          boxSize={6}
          as={isDataVisible ? ViewIcon : ViewOffIcon}
          cursor="pointer"
          onClick={handleDataVisible}
        />
      </Flex>

      <Flex alignItems="center" px={2}>
        {isDataVisible ? (
          <>
            <Icon
              as={isPositive ? FaArrowUp : FaArrowDown}
              color={isPositive ? 'green.500' : 'red.500'}
            />
            <Text ml={1} fontSize="lg" color={isPositive ? '#17ca56' : '#cf0c07'}>
              {`${totalPercentaje.toFixed(2)}%`}
            </Text>
          </>
        ) : (
          <Icon boxSize={12} as={PiDotsThreeOutlineFill} />
        )}
      </Flex>
    </Box>
  );
};
