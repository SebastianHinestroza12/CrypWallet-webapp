import { IconType } from 'react-icons';
import { GiShoppingBag } from 'react-icons/gi';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { IoArrowDownOutline, IoArrowUpOutline } from 'react-icons/io5';

interface OperationButtonConfig {
  icon: IconType;
  text: string;
}

export const OPERATION_BUTTONS: OperationButtonConfig[] = [
  { icon: GiShoppingBag, text: 'buy' },
  { icon: RiExchangeDollarLine, text: 'exchange' },
  { icon: IoArrowUpOutline, text: 'send' },
  { icon: IoArrowDownOutline, text: 'receive' },
];
