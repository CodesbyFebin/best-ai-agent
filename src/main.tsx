import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {AnalyticsSuite} from './components/AnalyticsSuite.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
    <AnalyticsSuite />
  </StrictMode>
);

if (root.hasChildNodes() && root.dataset.renderMode !== 'static-snapshot') {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
