import { Box, Image, Flex } from '@chakra-ui/react';
import loading from '../../assets/loading.svg';

export const Loading = () => {
  return (
    <Flex direction="column" justify="center" align="center" height="75vh">
      <Box>
        <Image src={loading} alt="Loading..." boxSize={{ base: '60px', md: '80px' }} />
      </Box>
    </Flex>
  );
};
