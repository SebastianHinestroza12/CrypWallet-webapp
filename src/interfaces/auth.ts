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
  setUserIdRecoveryAccount: (userId: string) => void;
  setRecoveryStep(step: number): void;
  setRecoreyProgress(progress: number): void;
  setCurrentWallet: (wallet: WalletsIProps, userId: string, updateDb?: boolean) => void;
  authenticateUser: (user: UserProps) => void;
  logoutUser: () => void;
  addWallet: (wallet: WalletsIProps, replaceWallet: boolean) => void;
  addSafeWords: (safes: string[]) => void;
  updateWallet: (walleId: string, name: string) => void;
  deleteWallet: (walletId: string) => void;
  setAvatarUrl: (url: string, updateDb: boolean) => void;
}
