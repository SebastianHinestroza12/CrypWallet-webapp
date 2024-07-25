import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoSwapHorizontalOutline,
  IoCardOutline,
} from 'react-icons/io5';
import { GoHistory } from 'react-icons/go';
import { MdSell } from 'react-icons/md';
import { ROUTES } from '../constants/redirectToRoute';
import { OperationButtonConfig } from '../interfaces';

export const OPERATION_BUTTONS: OperationButtonConfig[] = [
  { id: 1, icon: IoArrowUpOutline, text: 'send', route: ROUTES.OPERATIONS_SEND_CRYPTO },
  { id: 2, icon: IoArrowDownOutline, text: 'receive', route: ROUTES.OPERATIONS_RECEIVE_CRYPTO },
  { id: 3, icon: IoCardOutline, text: 'buy', route: ROUTES.OPERATIONS_BUY_CRYPTO },
  { id: 4, icon: MdSell, text: 'sell', route: ROUTES.OPERATIONS_SELL_CRYPTO },
  { id: 5, icon: IoSwapHorizontalOutline, text: 'swap', route: ROUTES.OPERATIONS_SWAP_CRYPTO },
  { id: 6, icon: GoHistory, text: 'history', route: ROUTES.OPERATIONS_HISTORY_CRYPTO },
];
