/* eslint-disable no-unused-vars */
import { IconType } from 'react-icons';
export interface NumericKeypadProps {
  onNumberClick: (num: number) => void;
  onDeleteClick: () => void;
  onDeleteAllClick: () => void;
  isDisabled: boolean;
}
export interface NumberButtonProps {
  number: number;
  onClick: (num: number) => void;
  disabled: boolean;
}
export interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled: boolean;
}
