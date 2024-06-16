import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

export const ErrorPage = () => {
  const error: string | Error = useRouteError() as Error | string;

  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Oops!
      </Heading>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Sorry, an unexpected error has occurred.
      </Heading>
      <Text color={'gray.500'}>
        <i>{error instanceof Error ? error.message : error}</i>
      </Text>
    </Box>
  );
};
