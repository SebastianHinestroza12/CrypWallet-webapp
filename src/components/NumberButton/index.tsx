/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from '@chakra-ui/react';

interface NumberButtonProps {
  number: number;
  onClick: (num: number) => void;
  disabled: boolean;
}

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
