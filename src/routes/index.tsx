import { createBrowserRouter } from 'react-router-dom';
import { CallToActionWithIllustration } from '../components/Start';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Dios es bueno</p>,
  },
  {
    path: '/getting-started',
    element: <CallToActionWithIllustration/>,
  },
  {
    path: '*',
    element: <h1 className="text-2xl font-bold underline cursor-no-drop">NotFoundPage!</h1>,
  },
]);
