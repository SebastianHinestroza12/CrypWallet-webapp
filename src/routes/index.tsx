import { createBrowserRouter } from 'react-router-dom';
import { CallToActionWithIllustration } from '../pages/LandingPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Home } from '../pages/Home';
import { ErrorPage } from '../pages/ErrorPage';
import { UserProfileEdit } from '../pages/Profile';

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
    children: [
      {
        path: 'login',
        element: <CallToActionWithIllustration />,
      },
      {
        path: 'register',
        element: <CallToActionWithIllustration />,
      },
      {
        path: 'user/profile',
        element: <UserProfileEdit />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
