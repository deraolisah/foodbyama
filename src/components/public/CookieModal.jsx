import React from 'react';
import { Link } from 'react-router-dom';

const CookieModal = ({ setOpenCookieModal }) => {
  const handleClose = () => {
    setOpenCookieModal(false)
  };

  return (
    <div className="fixed z-5000 top-1/2 left-1/2 -translate-1/2 w-full h-full bg-dark/40 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-light p-6 rounded-lg max-w-md mx-auto">
        <p>
          By clicking "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. 
          <br/> <br/>
          View our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more information.
        </p>
        <div className="mt-4">
          <button onClick={handleClose} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300">
            Accept
          </button>
          <button onClick={handleClose} className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-300">
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieModal;