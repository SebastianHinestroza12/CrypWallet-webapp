import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme } from './theme.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
