import 'moment/dist/locale/ru';
import moment from 'moment';
import TagManager from 'react-gtm-module';
import { isOnPremise } from '@3divi/shared-components';
import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';

moment.locale(window.navigator.language);

if (!isOnPremise()) {
  TagManager.initialize({
    gtmId: 'GTM-5QD2ZDS',
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>
);
