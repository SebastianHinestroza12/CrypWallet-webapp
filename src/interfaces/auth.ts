/* eslint-disable no-unused-vars */
export interface UserIProps {
  email: string;
  password: string;
}

export interface DataRegisterProps extends UserIProps {
  name: string;
  lastName: string;
}

export interface UserProps {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  currentWallet?: string;
}

export interface CryptoCurrencyProps {
  [key: string]: number;
}

export interface WalletsIProps {
  id: string;
  name: string;
  userId: string;
  address: string;
  cryptoCurrency: CryptoCurrencyProps;
}

export interface StoreStateAuthentication {
  isAuthenticated: boolean;
  authenticatedUser: UserProps;
  safeWords: string[];
  wallets: WalletsIProps[];
  currentWallet: WalletsIProps | null;
  recoveryProgress: number;
  recoveryStep: number;
  userIdRecoveryAccount: string | null;
  avatarUrl: string;
  transactions: TransactionUserIProps[];
  setUserIdRecoveryAccount: (userId: string) => void;
  setRecoveryStep(step: number): void;
  setRecoreyProgress(progress: number): void;
  setCurrentWallet: (wallet: WalletsIProps, userId: string, updateDb?: boolean) => void;
  authenticateUser: (user: UserProps) => void;
  logoutUser: () => void;
  sessionExpired: () => void;
  addWallet: (wallet: WalletsIProps, replaceWallet: boolean) => void;
  addSafeWords: (safes: string[]) => void;
  updateWallet: (walleId: string, name: string) => void;
  deleteWallet: (walletId: string) => void;
  setAvatarUrl: (url: string, updateDb: boolean) => void;
  setTransactions: (transactions: TransactionUserIProps[] | TransactionUserIProps) => void;
}

export interface TransactionUserIProps {
  id: number;
  idPayment: string | null;
  destination: string | null;
  origin: string;
  amount: number;
  symbol: string;
  name_cryptocurrency: string;
  type_transaction: string;
  referenceNumber: string;
  paymentGateway: string | null;
  user_origin: string;
  formatted_date: string;
  user_destination: string | null;
  cryptoFromId: string | null;
  cryptoToId: string | null;
  amountFrom: number | null;
  amountTo: number | null;
}
