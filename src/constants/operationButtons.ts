import { IconType } from 'react-icons';
import { GiShoppingBag } from 'react-icons/gi';
import { IoArrowDownOutline, IoArrowUpOutline } from 'react-icons/io5';
import { GoHistory } from 'react-icons/go';
import { MdSell } from 'react-icons/md';
interface OperationButtonConfig {
  icon: IconType;
  text: string;
}

export const OPERATION_BUTTONS: OperationButtonConfig[] = [
  { icon: IoArrowUpOutline, text: 'send' },
  { icon: IoArrowDownOutline, text: 'receive' },
  { icon: GiShoppingBag, text: 'buy' },
  { icon: MdSell, text: 'sell' },
  { icon: GoHistory, text: 'history' },
];
