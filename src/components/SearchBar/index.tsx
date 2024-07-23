/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Text,
  Box,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
};

export const SearchBar = ({ handleChange, title }: SearchBarProps) => {
  return (
    <Box width="100%" maxW="600px" mx="auto">
      <Text textAlign={'center'} textTransform={'capitalize'} fontSize={'2xl'} mb={3}>
        {title}
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color={useColorModeValue('gray.700', 'gray.300')} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="full"
          borderColor="gray.300"
          onChange={handleChange}
          _placeholder={{ color: 'gray.500' }}
          _focus={{ borderColor: '#1e59ea', boxShadow: '0 0 0 1px blue.500' }}
        />
      </InputGroup>
    </Box>
  );
};
