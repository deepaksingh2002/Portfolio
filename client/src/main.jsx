import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import './app.css';

import { AppRouter } from './routes/AppRouter';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { PortfolioProvider } from './store/api/portfolioContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </StrictMode>
);
