import React from 'react';
import { Button } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <Button
      isDisabled={disabled}
      size="lg"
      borderRadius="full"
      onClick={onClick}
      _hover={{ bg: '#1e59ea', color: 'white' }}
      width="70px"
      height="70px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon size={24} />
    </Button>
  );
};
