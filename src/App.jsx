// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { OrderProvider } from './contexts/OrderContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MenuProvider>
          <CartProvider>
            <CheckoutProvider>
              <OrderProvider>
                <AppRoutes />
              </OrderProvider>
            </CheckoutProvider>
          </CartProvider>
        </MenuProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;