import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/admin/AdminRoute.jsx';

// Account Pages
import Login from '../pages/account/Login.jsx';
import Account from "../pages/account/Account.jsx";
import OrderTracking from '../pages/account/OrderTracking.jsx';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import OrdersPage from '../pages/admin/OrdersPage.jsx';
import ProductsPage from '../pages/admin/ProductsPage.jsx';

// Other imports...
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Shop from '../pages/Shop.jsx';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import OrderSuccess from '../pages/account/OrderSuccess.jsx';
import NotFound from '../pages/NotFound.jsx';
import Search from '../pages/Search.jsx';
import Feedback from '../pages/Feedback.jsx';
import Privacy from '../pages/Privacy.jsx';
import Terms from '../pages/Terms.jsx';
import Returns from '../pages/Returns.jsx';
import Faqs from '../pages/Faqs.jsx';

const AppRoutes = () => {

  return (
    <div className='bg-light font-body tracking-wide overflow-x-hidden'>
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
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faqs" element={<Faqs />} />

          {/* USER DASHBOARD */}
          <Route path='/login' element={<Login />} />
          <Route path="/account" element={
            <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/track-order/:orderId" element={<OrderTracking />} />

          {/* ADMIN DASHBOARD */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>

          
          {/* 404 */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;