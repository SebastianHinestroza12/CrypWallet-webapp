import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme } from './theme.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
);
