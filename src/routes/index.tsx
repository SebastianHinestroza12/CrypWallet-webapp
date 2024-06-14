import { createBrowserRouter } from 'react-router-dom';
import { CallToActionWithIllustration } from '../components/Start';
import { NotFoundPage } from '../components/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CallToActionWithIllustration />,
  },
  {
    path: '/home',
    element: <p>Ruta principal</p>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
