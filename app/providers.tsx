'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import CartInitializer from './components/CartInitializer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartInitializer />
      {children}
    </Provider>
  );
}
