import { FC } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface TotalCashProps {
  amount: string;
  percentage: string;
  isPositive: boolean;
  onRefresh?: () => void;
}

export const TotalCash: FC<TotalCashProps> = ({ amount, percentage, isPositive, onRefresh }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} p={4} borderRadius="md" width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          My Wallet
        </Text>
        <Flex alignItems="center">
          <Text mr={2} color="blue.500" cursor="pointer" onClick={onRefresh}>
            Actualizar
          </Text>
          <Icon as={FaSync} color="blue.500" cursor="pointer" onClick={onRefresh} />
        </Flex>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={2}>
        {amount}
      </Text>
      <Flex alignItems="center" color={isPositive ? 'green.500' : 'red.500'}>
        <Icon as={isPositive ? FaArrowUp : FaArrowDown} />
        <Text ml={1} fontSize="lg">
          {percentage}
        </Text>
      </Flex>
    </Box>
  );
};
