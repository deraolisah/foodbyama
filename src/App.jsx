// App.js
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext'; // Add this

import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <MenuProvider>
        <ToastProvider> {/* Wrap with ToastProvider */}
          <CartProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </ToastProvider>
      </MenuProvider>
    </>
  )
}

export default App