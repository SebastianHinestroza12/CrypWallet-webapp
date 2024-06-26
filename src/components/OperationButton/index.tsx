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
        width="55px"
        height="55px"
        _hover={{ bg: '#66ccff' }}
        _active={{ bg: '#007bff' }}
        {...rest}
      >
        <Icon as={icon} boxSize={9} color={'#FFF'} />
      </Button>
      <Text textTransform={'capitalize'} textAlign={'center'}>
        {text}
      </Text>
    </Stack>
  );
};
