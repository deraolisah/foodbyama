// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Public Pages
// import PublicLayout from '../layouts/PublicLayout';
// import Home from '../pages/Home.jsx';
// import About from '../pages/About.jsx';
// import Contact from '../pages/Contact.jsx';
// import Shop from '../pages/Shop.jsx';
// import Cart from '../pages/Cart.jsx';
// import Account from '../pages/Account.jsx';
// import Checkout from '../pages/Checkout.jsx';
// import OrderSuccess from '../pages/OrderSuccess.jsx';
// import Orders from '../pages/Orders.jsx';


// // 
// import Login from '../pages/Login.jsx';


// // 
// import NotFound from '../pages/NotFound.jsx';
// import Search from '../pages/Search.jsx';
// import Feedback from '../pages/Feedback.jsx';
// import Privacy from '../pages/Privacy.jsx';
// import Terms from '../pages/Terms.jsx';
// import Returns from '../pages/Returns.jsx';
// import Faqs from '../pages/Faqs.jsx';

// const AppRoutes = () => {
//   return (
//     <div className='bg-light font-body tracking-wide'>
//       <Routes>
//         <Route element={<PublicLayout />}> 
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/account" element={<Account />} />
//           <Route path="/checkout" element={<Checkout />} /> 
//           <Route path="/order-success" element={<OrderSuccess />} />
//           <Route path="/orders/:orderId" element={<Orders />} />
//           <Route path='/search' element={<Search /> } />
//           <Route path="/feedback" element={<Feedback />} />

//           {/* Legal Pages */}
//           <Route path='/privacy' element={<Privacy />} />
//           <Route path='/terms' element={<Terms />} />
//           <Route path='/returns' element={<Returns />} />
//           <Route path='/faqs' element={<Faqs />} />


//           <Route path='login' element={<Login />} />




//           {/* Not Found Page */}
//           <Route path='*' element={<NotFound />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default AppRoutes;


// In your AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RequireEmailVerification from '../components/RequireEmailVerification';

// Account Pages
import AccountLayout from '../pages/account/index';
import AccountOverview from '../pages/account/Overview.jsx';
import AccountOrders from '../pages/account/Orders.jsx';
import AccountOrderDetails from '../pages/account/OrderDetails';
import AccountLoyalty from '../pages/account/Loyalty'; // You'll create this

// Other imports...
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Shop from '../pages/Shop.jsx';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import OrderSuccess from '../pages/OrderSuccess.jsx';
import NotFound from '../pages/NotFound.jsx';
import Search from '../pages/Search.jsx';
import Feedback from '../pages/Feedback.jsx';
import Privacy from '../pages/Privacy.jsx';
import Terms from '../pages/Terms.jsx';
import Returns from '../pages/Returns.jsx';
import Faqs from '../pages/Faqs.jsx';
import Login from '../pages/Login.jsx';


const AppRoutes = () => {
  return (
    <div className='bg-light font-body tracking-wide'>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/search" element={<Search />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Account Routes */}
          <Route path="/account" element={
            <ProtectedRoute>
              <RequireEmailVerification>
                <AccountLayout />
              </RequireEmailVerification>
            </ProtectedRoute>
          }>
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="orders/:orderId" element={<AccountOrderDetails />} />
            <Route path="loyalty" element={<AccountLoyalty />} />
          </Route>
          
          {/* 404 */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;