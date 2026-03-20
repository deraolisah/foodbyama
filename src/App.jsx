// App.js
import React from 'react';
import { ToastProvider } from './contexts/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <OrderProvider>
              <MenuProvider>
                <BrowserRouter>
                  <AppRoutes />
                  <LoginModal />
                </BrowserRouter>
              </MenuProvider>
            </OrderProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;