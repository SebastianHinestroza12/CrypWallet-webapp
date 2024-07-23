import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';

interface TransactionResultProps {
  title: string;
  message: string;
  status: 'success' | 'cancel';
}

export const TransactionResult = ({
  title,
  message,
  status = 'success',
}: TransactionResultProps) => {
  const color = status === 'success' ? 'green.500' : 'red.500';

  return (
    <Box textAlign="center" py={10} px={6}>
      {status === 'success' ? (
        <CheckCircleIcon boxSize={'50px'} color={color} />
      ) : (
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={color}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center"
          >
            <CloseIcon boxSize={'20px'} color={'white'} />
          </Flex>
        </Box>
      )}
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color={'gray.500'}>{message}</Text>
    </Box>
  );
};
