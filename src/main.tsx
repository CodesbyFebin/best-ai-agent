import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import RouterApp from './components/RouterApp';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing root element: <div id="root"></div>');
}

hydrateRoot(rootElement,
  <StrictMode>
    <ErrorBoundary>
      <RouterApp />
    </ErrorBoundary>
  </StrictMode>
);
