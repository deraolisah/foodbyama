// App.js
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';

import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <ToastProvider> {/* ToastProvider should be OUTSIDE CartProvider */}
        <MenuProvider>
          <CartProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </MenuProvider>
      </ToastProvider>
    </>
  )
}

export default App