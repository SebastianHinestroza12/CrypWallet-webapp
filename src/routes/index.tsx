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
import { Notifications } from '../pages/Notifications';
import { Preferences } from '../pages/Preferences';
import { ManageCryptocurrencies } from '../pages/ManageCryptocurrencies';
import { DetailCrypto } from '../pages/DetailCrypto';
import { SearchCrypto } from '../pages/SearchCrypto';
import { Layout } from '../components/Layout';
import { Currency } from '../pages/Preferences/Currency';
import { AppLanguage } from '../pages/Preferences/AppLanguage';
import { Wallets } from '../pages/Wallets';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { CreateWallet } from '../pages/Wallets/CreatedWallet';
import { ROUTES } from '../constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
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
    errorElement: <ErrorPage />,
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
        path: ROUTES.NOTIFICATIONS,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.EMPTY,
            element: <Notifications />,
          },
        ],
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
            path: ROUTES.CRYPTO_MANAGE,
            element: <ManageCryptocurrencies />,
          },
          {
            path: ROUTES.CRYPTO_SEARCH,
            element: <SearchCrypto />,
          },
        ],
      },
    ],
  },
]);
