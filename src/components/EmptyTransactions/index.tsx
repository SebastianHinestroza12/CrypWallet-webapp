import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

interface EmptyTransactionIProps {
  coinName: string;
  eventClick?: () => void;
}

export const EmptyTransaction = ({ coinName, eventClick }: EmptyTransactionIProps) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      textAlign={'center'}
      mb={4}
    >
      <Box mb={{ base: 4, md: 6 }}>
        <Icon icon={'quill:paper'} width={60} color={'blue.500'} />
      </Box>
      <Box mb={{ base: 4, md: 6 }}>
        <Text color={'gray.600'} fontSize={'lg'} fontWeight={'medium'}>
          No tienes transacciones de {coinName}.
        </Text>
        <Text color={'gray.400'} fontSize={'sm'}>
          Las transacciones aparecerán aquí cuando las realices.
        </Text>
      </Box>
      <Box>
        <Button
          rounded={'full'}
          onClick={eventClick}
          fontWeight={'bold'}
          color={'#FFF'}
          bg={'#1E59EA'}
          _hover={{ bg: '#0039A0', cursor: 'pointer' }}
          _active={{ bg: '#0039A0' }}
          size={{ base: 'md', md: 'lg' }}
        >
          {`Comprar ${coinName}`}
        </Button>
      </Box>
    </Flex>
  );
};
