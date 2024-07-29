import { Box, Button } from '@chakra-ui/react';
import { SwapItem } from '../../../../components/SwapItem/index';

export const SwapForm = () => {
  return (
    <Box>
      <Box my={20}>
        <SwapItem />
      </Box>
      <Button
        type="submit"
        rounded={'full'}
        fontWeight={'bold'}
        color={'#FFF'}
        bg={'#1E59EA'}
        _hover={{ bg: '#0039A0', cursor: 'pointer' }}
        _active={{ bg: '#0039A0' }}
        width={{ base: 'full', md: 'lg' }}
        mx={{ base: 0, md: 'auto' }}
      >
        Continuar
      </Button>
    </Box>
  );
};
