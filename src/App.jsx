// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <OrderProvider>
              <BrowserRouter>
                <MenuProvider>
                  <AppRoutes />
                </MenuProvider>
              </BrowserRouter>
            </OrderProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;