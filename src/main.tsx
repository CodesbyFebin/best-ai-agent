import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {AnalyticsSuite} from './components/AnalyticsSuite.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AnalyticsSuite />
  </StrictMode>,
);
