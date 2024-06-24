import { FC } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar: FC = () => {
  return (
    <Box width="100%" maxW="600px" mx="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color={useColorModeValue('gray.700', 'gray.300')} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="full"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
          _focus={{ borderColor: '#1e59ea', boxShadow: '0 0 0 1px blue.500' }}
        />
      </InputGroup>
    </Box>
  );
};
