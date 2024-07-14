import { FC } from 'react';
import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { OperationButtonProps } from '../../interfaces';

export const OperationButton: FC<OperationButtonProps> = ({ icon, onClick, text, ...rest }) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      width="fit-content"
    >
      <Button
        onClick={onClick}
        bg="#1e59ea"
        borderRadius="full"
        width={{ base: '48px', md: '52px' }}
        height={{ base: '48px', md: '52px' }}
        _hover={{ bg: '#66ccff', cursor: 'pointer' }}
        _active={{ bg: '#007bff' }}
        {...rest}
      >
        <Icon as={icon} boxSize={{ base: 8, md: 9 }} color={'#FFF'} />
      </Button>
      <Text textTransform={'capitalize'} textAlign={'center'}>
        {text}
      </Text>
    </Stack>
  );
};
