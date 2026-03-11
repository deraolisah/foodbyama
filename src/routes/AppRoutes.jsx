import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Shop from '../pages/Shop.jsx';
import Cart from '../pages/Cart.jsx';
import Account from '../pages/Account.jsx';
import Checkout from '../pages/Checkout.jsx';
import OrderSuccess from '../pages/OrderSuccess.jsx';
import Orders from '../pages/Orders.jsx';


// 
import Login from '../pages/Login.jsx';


// 
import NotFound from '../pages/NotFound.jsx';
import Search from '../pages/Search.jsx';
import Feedback from '../pages/Feedback.jsx';

const AppRoutes = () => {
  return (
    <div className='bg-light font-body tracking-wide'>
      <Routes>
        <Route element={<PublicLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders/:orderId" element={<Orders />} />
          <Route path='/search' element={<Search /> } />
          <Route path="/feedback" element={<Feedback />} />


          <Route path='login' element={<Login />} />




          {/* Not Found Page */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;