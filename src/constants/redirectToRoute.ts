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
  CRYPTO_MANAGE: '/crypto/manage',
  CRYPTO_SEARCH: '/crypto/search',
  NOT_FOUND: '*',
  EMPTY: '',
};
