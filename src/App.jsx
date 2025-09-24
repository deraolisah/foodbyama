// App.js
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { CheckoutProvider } from './contexts/CheckoutContext'; // Add this
import { OrderProvider } from './contexts/OrderContext';

import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <ToastProvider> {/* ToastProvider should be OUTSIDE CartProvider */}
        <MenuProvider>
          <CartProvider>
            <CheckoutProvider> {/* Add CheckoutProvider */}
              <OrderProvider> {/* Add OrderProvider */}
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </OrderProvider>
            </CheckoutProvider>
          </CartProvider>
        </MenuProvider>
      </ToastProvider>
    </>
  )
}

export default App