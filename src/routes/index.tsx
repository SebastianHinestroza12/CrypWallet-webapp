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
import { ManageCryptocurrencies } from '../pages/ManageCryptocurrencies';
import { CRYPTOCURRENCYS } from '../constants';
import { DetailCrypto } from '../pages/DetailCrypto';
import { SerachCrypto } from '../pages/SearchCrypto';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CallToActionWithIllustration />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'about-us',
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'notifications',
    element: <Notifications />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: 'auth',
    errorElement: <ErrorPage />,
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
        element: <UserProfileEdit />,
      },
      {
        path: 'recover-account',
        element: <RecoverAccountMultistep />,
      },
    ],
  },
  {
    path: 'crypto',
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'detail/:cryptoId',
        element: <DetailCrypto />,
      },
      {
        path: 'manage',
        element: <ManageCryptocurrencies cryptocurrencies={CRYPTOCURRENCYS} />,
      },
      {
        path: 'search',
        element: <SerachCrypto />,
      },
    ],
  },
]);
