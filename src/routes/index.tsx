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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CallToActionWithIllustration />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'notifications',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Notifications />,
          },
        ],
      },
      {
        path: 'wallets',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Wallets />,
          },
        ],
      },
      {
        path: 'preferences',
        children: [
          {
            path: 'list',
            element: <Preferences />,
          },
          {
            path: 'list/currency',
            element: <Currency />,
          },
          {
            path: 'list/app-language',
            element: <AppLanguage />,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'user-signin',
            element: <UserLogIn />,
          },
          {
            path: 'user-signup',
            element: <UserRegistrationForm />,
          },
          {
            path: 'user-profile',
            element: <ProtectedRoute />,
            children: [
              {
                path: '',
                element: <UserProfileEdit />,
              },
            ],
          },
          {
            path: 'recover-account',
            element: <RecoverAccountMultistep />,
          },
        ],
      },
      {
        path: 'crypto',
        children: [
          {
            path: 'detail/:cryptoId',
            element: <DetailCrypto />,
          },
          {
            path: 'manage',
            element: <ManageCryptocurrencies />,
          },
          {
            path: 'search',
            element: <SearchCrypto />,
          },
        ],
      },
    ],
  },
]);
