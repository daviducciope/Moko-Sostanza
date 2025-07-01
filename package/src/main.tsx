
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './css/globals.css';
import App from './App.tsx';
import Spinner from './views/spinner/Spinner.tsx';
import ErrorBoundary from './components/shared/ErrorBoundary';


createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </ErrorBoundary>
);
