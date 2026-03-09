import React from 'react';
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="container text-center text-sm py-12 space-y-4">
      <img src={logo} alt='' className="mx-auto rounded-md" />
Privacy Policy
|
About us
|
Terms & Condition
|
Refund Policy
|
Store Information


      <br/><br/>
      <div>
        ©2026. FoodByAma. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer;