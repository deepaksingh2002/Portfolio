import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
