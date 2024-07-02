import { FC } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Button } from '@chakra-ui/react';
import { FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { TotalCashProps } from '../../interfaces';

export const TotalCash: FC<TotalCashProps> = ({
  amount,
  percentage,
  isPositive,
  onRefresh,
  isLoading,
}) => {
  const bg = useColorModeValue('gray.100', '#171717');
  const { isDataVisible, setDataVisible } = useStoreVisibilityData();

  return (
    <Box bg={bg} p={3} borderRadius="md" width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="lg" fontWeight="bold">
          My Wallet
        </Text>
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

      <Flex alignItems={'center'}>
        {isDataVisible ? (
          <Text mr={3} fontSize="2xl" fontWeight="bold" mb={2}>
            {amount}
          </Text>
        ) : (
          <Icon boxSize={12} mr={4} as={PiDotsThreeOutlineFill} />
        )}
        <Icon
          boxSize={6}
          as={isDataVisible ? ViewIcon : ViewOffIcon}
          cursor="pointer"
          onClick={() => setDataVisible()}
        />
      </Flex>

      <Flex alignItems="center" color={isPositive ? 'green.500' : 'red.500'}>
        {isDataVisible ? (
          <>
            <Icon as={isPositive ? FaArrowUp : FaArrowDown} />
            <Text ml={1} fontSize="lg">
              {percentage}
            </Text>
          </>
        ) : (
          <Icon boxSize={12} as={PiDotsThreeOutlineFill} />
        )}
      </Flex>
    </Box>
  );
};
