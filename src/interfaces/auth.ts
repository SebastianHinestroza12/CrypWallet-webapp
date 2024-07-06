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
  manageCrypo: string[];
  cryptoCurrency: CryptoCurrencyProps;
}

export interface StoreStateAuthentication {
  isAuthenticated: boolean;
  authenticatedUser: UserProps;
  safeWords: string[];
  wallets: WalletsIProps[];
  currentWallet: WalletsIProps | null;
  setCurrentWallet: (wallet: WalletsIProps, userId: string, updateDb?: boolean) => void;
  authenticateUser: (user: UserProps) => void;
  logoutUser: () => void;
  addWallet: (wallet: WalletsIProps) => void;
  addSafeWords: (safes: string[]) => void;
  updateWallet: (walleId: string, name: string) => void;
  deleteWallet: (walletId: string) => void;
}
