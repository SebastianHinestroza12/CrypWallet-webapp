import { createBrowserRouter } from 'react-router-dom';
import { CallToActionWithIllustration } from '../pages/LandingPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Home } from '../pages/Home';
import { ErrorPage } from '../pages/ErrorPage';
import { UserProfileEdit } from '../pages/Profile';
import { UserRegistrationForm } from '../pages/Auth/SignUp';
import { UserLogIn } from '../pages/Auth/SignIn';
import { VerifyAccountForm } from '../pages/Auth/VerifyEmail';
import { CheckKeywordForm } from '../pages/Auth/CheckKeywords';
import { AboutUs } from '../pages/AboutUs';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CallToActionWithIllustration />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
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
        path: 'verify-account',
        element: <VerifyAccountForm />,
      },
      {
        path: 'check-keywords',
        element: <CheckKeywordForm />,
      },
      {
        path: 'recover-account',
        element: <VerifyAccountForm />,
      },
    ],
  },
  {
    path: 'about-us',
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
