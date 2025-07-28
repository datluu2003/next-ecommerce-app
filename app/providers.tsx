'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import CartInitializer from './components/CartInitializer';
import { AuthProvider } from './contexts/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartInitializer />
        {children}
      </AuthProvider>
    </Provider>
  );
}
