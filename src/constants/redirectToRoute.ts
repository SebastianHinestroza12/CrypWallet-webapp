type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  ROOT: '/',
  LANDING: '/landing',
  HOME: '/home',
  ABOUT_US: '/about-us',
  NOTIFICATIONS: '/notifications',
  WALLETS: '/wallets',
  CREATE_WALLET: '/wallets/created',
  EDIT_WALLET: '/wallets/edit',
  SECURUTY_LIST: '/security/list',
  SECURUTY_SECRET_WORDS: '/security/list/secret-words',
  SECURUTY_CHANGE_PASSWORD: '/security/list/change-password',
  PREFERENCES: '/preferences',
  PREFERENCES_LIST: '/preferences/list',
  PREFERENCES_CURRENCY: '/preferences/list/currency',
  PREFERENCES_LANGUAGE: '/preferences/list/app-language',
  AUTHENTICATION: '/auth',
  USER_SIGNIN: '/auth/user-signin',
  USER_SIGNUP: '/auth/user-signup',
  USER_PROFILE: '/auth/user-profile',
  RECOVER_ACCOUNT: '/auth/recover-account',
  CRYPTOCURRENCY: '/crypto',
  CRYPTO_DETAIL_MAIN: '/crypto/detail',
  CRYPTO_DETAIL: '/crypto/detail/:cryptoId',
  CRYPTO_DETAIL_OVERVIEW_MAIN: '/crypto/detail/overview',
  CRYPTO_DETAIL_OVERVIEW: '/crypto/detail/overview/:cryptoId',
  CRYPTO_MANAGE: '/crypto/manage',
  CRYPTO_SEARCH: '/crypto/search',
  OPERATIONS: '/operations',
  OPERATIONS_SEND_CRYPTO: '/operations/send',
  OPERATIONS_SEND_TRANSFER_CRYPTO: '/operations/send/transfer-crypto',
  OPERATIONS_RECEIVE_TRANSFER_CRYPTO: '/operations/receive/transfer-crypto',
  OPERATIONS_BUY_CRYPTO_WITH_GATEWAY: '/operations/buy/transfer-crypto',
  OPERATIONS_RECEIVE_CRYPTO: '/operations/receive',
  OPERATIONS_SWAP_CRYPTO: '/operations/swap',
  OPERATIONS_BUY_CRYPTO: '/operations/buy',
  OPERATIONS_HISTORY_CRYPTO: '/operations/history',
  TRANSACTION_SUCCESS: '/transaction-success',
  TRANSACTION_DETAILS: '/transaction-details',
  SUCCESS_PAYMENT: '/success-payment',
  CANCEL_PAYMENT: '/cancel-payment',
  TRANSACTION_SWAP: '/transaction/swap',
  NOT_FOUND: '*',
  EMPTY: '',
};
