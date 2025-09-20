import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';

import AppRoutes from './routes/AppRoutes'


function App() {
  

  return (
    <>
      <MenuProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </MenuProvider>
    </>
  )
}

export default App