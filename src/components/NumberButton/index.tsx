import React from 'react';
import { Button } from '@chakra-ui/react';
import { NumberButtonProps } from '../../interfaces';

export const NumberButton: React.FC<NumberButtonProps> = ({ number, onClick, disabled }) => {
  return (
    <Button
      isDisabled={disabled}
      size="lg"
      borderRadius="full"
      onClick={() => onClick(number)}
      _hover={{ bg: '#1e59ea', color: 'white' }}
      width="70px"
      height="70px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {number}
    </Button>
  );
};
