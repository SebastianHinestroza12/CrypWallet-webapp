import { IconType } from 'react-icons';
import { GiShoppingBag } from 'react-icons/gi';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';
import { MdOutlineCallReceived } from 'react-icons/md';

interface OperationButtonConfig {
  icon: IconType;
  text: string;
}

export const OPERATION_BUTTONS: OperationButtonConfig[] = [
  { icon: GiShoppingBag, text: 'buy' },
  { icon: RiExchangeDollarLine, text: 'exchange' },
  { icon: IoIosSend, text: 'send' },
  { icon: MdOutlineCallReceived, text: 'receive' },
];
