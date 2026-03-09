import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home.jsx';
import Menu from '../pages/Menu.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Shop from '../pages/Shop.jsx';
import Cart from '../pages/Cart.jsx';
import Account from '../pages/Account.jsx';
import Checkout from '../pages/Checkout.jsx'; // Add this
import OrderSuccess from '../pages/OrderSuccess.jsx'; // Add this
// import ItemDetail from '../pages/ItemDetail.jsx';
import Orders from '../pages/Orders.jsx';
import NotFound from '../pages/NotFound.jsx';

const AppRoutes = () => {
  return (
    <div className='bg-light font-body tracking-wide'>
      <Routes>
        <Route element={<PublicLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Add checkout route */}
           <Route path="/order-success" element={<OrderSuccess />} /> {/* Add this route */}
           <Route path="/orders/:orderId" element={<Orders />} />
          {/* <Route path="/menu/:category/:itemName" element={<ItemDetail />} /> */}

          {/* Not Found Page */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;