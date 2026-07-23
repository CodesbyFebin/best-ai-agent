import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import RouterApp from './components/RouterApp.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing root element: <div id="root"></div>');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterApp />
    </ErrorBoundary>
  </StrictMode>,
);
