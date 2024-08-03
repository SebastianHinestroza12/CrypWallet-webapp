/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, ComponentType, LazyExoticComponent } from 'react';
import { ROUTES } from '../constants';
import { createBrowserRouter } from 'react-router-dom';
import { CallToActionWithIllustration } from '../pages/LandingPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Home } from '../pages/Home';
import { ErrorPage } from '../pages/ErrorPage';
import { UserProfileEdit } from '../pages/Profile';
import { UserRegistrationForm } from '../pages/Auth/SignUp';
import { UserLogIn } from '../pages/Auth/SignIn';
import { AboutUs } from '../pages/AboutUs';
import { RecoverAccountMultistep } from '../pages/Auth/RecoverAccount';
import { Preferences } from '../pages/Preferences';
import { ManageCryptocurrencies } from '../pages/ManageCryptocurrencies';
import { DetailCrypto } from '../pages/DetailCrypto';
import { SearchCrypto } from '../pages/SearchCrypto';
import { Layout } from '../components/Layout';
import { Currency } from '../pages/Preferences/Currency';
import { AppLanguage } from '../pages/Preferences/AppLanguage';
import { Wallets } from '../pages/Wallets';
import { ProtectedRoute } from '../middlewares/ProtectedRoute';
import { Splash } from '../pages/Splash';
import { CreateWallet } from '../pages/Wallets/CreatedWallet';
import { EditWallet } from '../pages/Wallets/EditWallet';
import { SecurityList } from '../pages/Security';
import { SafeWords } from '../pages/Security/SafeWords';
import { ProtectedSecurityRoute } from '../middlewares/ProtectedSecurityRoute';
import { ChangePassword } from '../pages/Security/ChangePassword';
import { SwapList } from '../pages/Operations/Swap';
import { SendList } from '../pages/Operations/Send';
import { TransferStep } from '../pages/Operations/Send/TransferStep';
import { TransactionSuccess } from '../pages/TransactionSuccess';
import { TransactionDetails } from '../pages/TransactionDetails';
import { ReceiveList } from '../pages/Operations/Receive';
import { ReceiveCrypto } from '../pages/Operations/Receive/ReceiveCrypto';
import { BuyList } from '../pages/Operations/Buy';
import { BuyCryptoWithGateway } from '../pages/Operations/Buy/BuyCryptoWithGateway';
import { Success } from '../pages/SuccessResult';
import { Cancel } from '../pages/CancelResult';
import { AllTransactions } from '../pages/Operations/History';
import { SwapForm } from '../pages/Operations/Swap/SwapForm';
import { Loading } from '../components/Loading';

const simulateDelay = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const lazyWithDelay = (
  importFunction: () => Promise<{ default: ComponentType<any> }>,
  delay: number,
): LazyExoticComponent<ComponentType<any>> => {
  return lazy(() =>
    Promise.all([importFunction(), simulateDelay(delay)]).then(([moduleExports]) => moduleExports),
  );
};

const CryptoOverview = lazyWithDelay(() => import('../pages/DetailCrypto/CryptoOverview'), 2000);

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Splash />,
  },
  {
    path: ROUTES.LANDING,
    element: <CallToActionWithIllustration />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: ROUTES.ROOT,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: ROUTES.WALLETS,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <Wallets />,
          },
          {
            path: ROUTES.CREATE_WALLET,
            element: <CreateWallet />,
          },
          {
            path: ROUTES.EDIT_WALLET,
            element: <EditWallet />,
          },
        ],
      },
      {
        path: ROUTES.SECURUTY_LIST,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <ProtectedSecurityRoute />,
            children: [
              {
                path: ROUTES.EMPTY,
                element: <SecurityList />,
              },
              {
                path: ROUTES.SECURUTY_SECRET_WORDS,
                element: <SafeWords />,
              },
              {
                path: ROUTES.SECURUTY_CHANGE_PASSWORD,
                element: <ChangePassword />,
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.PREFERENCES,
        children: [
          {
            path: ROUTES.PREFERENCES_LIST,
            element: <Preferences />,
          },
          {
            path: ROUTES.PREFERENCES_CURRENCY,
            element: <Currency />,
          },
          {
            path: ROUTES.PREFERENCES_LANGUAGE,
            element: <AppLanguage />,
          },
        ],
      },
      {
        path: ROUTES.AUTHENTICATION,
        children: [
          {
            path: ROUTES.USER_SIGNIN,
            element: <UserLogIn />,
          },
          {
            path: ROUTES.USER_SIGNUP,
            element: <UserRegistrationForm />,
          },
          {
            path: ROUTES.USER_PROFILE,
            element: <ProtectedRoute />,
            children: [
              {
                path: ROUTES.EMPTY,
                element: <UserProfileEdit />,
              },
            ],
          },
          {
            path: ROUTES.RECOVER_ACCOUNT,
            element: <RecoverAccountMultistep />,
          },
        ],
      },
      {
        path: ROUTES.CRYPTOCURRENCY,
        children: [
          {
            path: ROUTES.CRYPTO_DETAIL,
            element: <DetailCrypto />,
          },
          {
            path: ROUTES.CRYPTO_DETAIL_OVERVIEW,
            element: (
              <Suspense fallback={<Loading />}>
                <CryptoOverview />
              </Suspense>
            ),
          },
          {
            path: ROUTES.CRYPTO_MANAGE,
            element: <ManageCryptocurrencies />,
          },
          {
            path: ROUTES.CRYPTO_SEARCH,
            element: <SearchCrypto />,
          },
        ],
      },
      {
        path: ROUTES.OPERATIONS,
        children: [
          {
            path: ROUTES.OPERATIONS_SEND_CRYPTO,
            element: <SendList />,
          },
          {
            path: ROUTES.OPERATIONS_RECEIVE_CRYPTO,
            element: <ReceiveList />,
          },
          {
            path: ROUTES.OPERATIONS_SWAP_CRYPTO,
            element: <SwapList />,
          },
          {
            path: ROUTES.OPERATIONS_BUY_CRYPTO,
            element: <BuyList />,
          },
          {
            path: ROUTES.OPERATIONS_HISTORY_CRYPTO,
            element: <AllTransactions />,
          },
        ],
      },
      {
        path: ROUTES.OPERATIONS_SEND_TRANSFER_CRYPTO,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <TransferStep />,
          },
        ],
      },
      {
        path: ROUTES.OPERATIONS_RECEIVE_TRANSFER_CRYPTO,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <ReceiveCrypto />,
          },
        ],
      },
      {
        path: ROUTES.OPERATIONS_BUY_CRYPTO_WITH_GATEWAY,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <BuyCryptoWithGateway />,
          },
        ],
      },
      {
        path: ROUTES.TRANSACTION_SUCCESS,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <TransactionSuccess />,
          },
        ],
      },
      {
        path: ROUTES.TRANSACTION_DETAILS,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <TransactionDetails />,
          },
        ],
      },
      {
        path: ROUTES.SUCCESS_PAYMENT,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <Success />,
          },
        ],
      },
      {
        path: ROUTES.CANCEL_PAYMENT,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <Cancel />,
          },
        ],
      },
      {
        path: ROUTES.TRANSACTION_SWAP,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <SwapForm />,
          },
        ],
      },
    ],
  },
]);
