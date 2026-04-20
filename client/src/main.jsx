import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import './app.css';

import { AppRouter } from './routes/AppRouter';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { PortfolioProvider } from './store/api/portfolioContext';
import AuthBootstrap from './Components/admin/AuthBootstrap';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthBootstrap />
      <PortfolioProvider>
        <ToastProvider>
          <HelmetProvider>
            <BrowserRouter>
              <App>
                <AppRouter />
              </App>
            </BrowserRouter>
          </HelmetProvider>
        </ToastProvider>
      </PortfolioProvider>
    </Provider>
  </StrictMode>
);
