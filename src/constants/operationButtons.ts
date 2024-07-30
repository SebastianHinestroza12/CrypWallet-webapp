import { IoSwapHorizontal, IoCardOutline } from 'react-icons/io5';
import { GoHistory, GoArrowDown, GoArrowUp } from 'react-icons/go';
import { ROUTES } from '../constants/redirectToRoute';
import { OperationButtonConfig } from '../interfaces';

export const OPERATION_BUTTONS: OperationButtonConfig[] = [
  { id: 1, icon: GoArrowUp, text: 'send', route: ROUTES.OPERATIONS_SEND_CRYPTO },
  { id: 2, icon: GoArrowDown, text: 'receive', route: ROUTES.OPERATIONS_RECEIVE_CRYPTO },
  { id: 3, icon: IoCardOutline, text: 'buy', route: ROUTES.OPERATIONS_BUY_CRYPTO },
  { id: 5, icon: IoSwapHorizontal, text: 'swap', route: ROUTES.OPERATIONS_SWAP_CRYPTO },
  { id: 6, icon: GoHistory, text: 'history', route: ROUTES.OPERATIONS_HISTORY_CRYPTO },
];
