import React from 'react';
import { Link } from 'react-router-dom';

const Cookie = () => {
  return (
    <div>
      By clicking "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. 
      View our <Link to="/privacy" className="">Privacy Policy</Link> for more information.
    </div>
  )
}

export default Cookie;