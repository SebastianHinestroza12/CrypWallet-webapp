import { ButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface OperationButtonProps extends ButtonProps {
  icon: IconType;
  onClick?: () => void;
  text: string;
}
