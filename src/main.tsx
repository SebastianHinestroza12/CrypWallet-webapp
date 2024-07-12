import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme } from './theme.ts';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ChakraProvider>,
);
