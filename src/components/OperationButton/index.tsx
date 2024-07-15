import { Button, Flex, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { OPERATION_BUTTONS } from '../../constants';
import { useNavigate } from 'react-router-dom';

export const OperationButton = () => {
  const navigate = useNavigate();
  const showSwap = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Stack spacing={2}>
      <Flex alignItems="center" justifyContent="space-between">
        {OPERATION_BUTTONS.filter(({ id }) => showSwap || id !== 5).map(({ icon, route, text }) => (
          <Flex key={text} direction="column" alignItems="center" width="fit-content">
            <Button
              onClick={() => navigate(route)}
              bg="#1e59ea"
              borderRadius="full"
              width={{ base: '48px', md: '52px' }}
              height={{ base: '48px', md: '52px' }}
              _hover={{ bg: '#66ccff', cursor: 'pointer' }}
              _active={{ bg: '#007bff' }}
            >
              <Icon as={icon} boxSize={{ base: 8, md: 9 }} color={'#FFF'} />
            </Button>
            <Text textTransform={'capitalize'} textAlign={'center'}>
              {text}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
};
