/* eslint-disable no-unused-vars */
import { ButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface OperationButtonProps extends ButtonProps {
  icon: IconType;
  onClick?: () => void;
  text: string;
}

export interface StoreStateVisibility {
  isDataVisible: boolean;
  totalCash: number;
  symbol: string;
  totalPercentaje: number;
  isPositive: boolean | null;
  setDataVisible: () => void;
  setTotalCash: (amount: number) => void;
  setSymbol: (symbol: string) => void;
  setTotalPercentaje: (percentaje: number) => void;
  setIsPositive: (isPositive: boolean) => void;
}
