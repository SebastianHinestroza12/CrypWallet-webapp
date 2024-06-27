import { FC } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useStoreVisibilityData } from '../../stores/dataVisibility';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';

interface TotalCashProps {
  amount: string;
  percentage: string;
  isPositive: boolean;
  onRefresh: () => void;
}

export const TotalCash: FC<TotalCashProps> = ({ amount, percentage, isPositive, onRefresh }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const { isDataVisible, setDataVisible } = useStoreVisibilityData();

  return (
    <Box bg={bg} p={2} borderRadius="md" width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="lg" fontWeight="bold">
          My Wallet
        </Text>
        <Flex
          alignItems="center"
          onClick={onRefresh}
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
        >
          <Text mr={2} color="blue.500" cursor="pointer">
            Actualizar
          </Text>
          <Icon as={FaSync} color="blue.500" cursor="pointer" />
        </Flex>
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
