import React from 'react'

const About = () => {
  return (
    <div>
      
      {/*  */}
      <div className='container py-4'>
        <h2 className='md:text-2xl font-semibold'> Welcome to Food By Ama! 🎉 </h2>
        <br/>
        <p> We sell delicious meals, provide cartering services and offer Home/Office Deliveries. </p>
        
        <br/>
        <p className='font-semibold'> How to order from this store: 🍰 </p>
        - Click on any food that you want to order. <br/>
        - Click the "Add to Cart" button on the bottom corner. <br/>
        - Then go to Cart page, and verify the items in your Cart. <br/>
        - Then click on "Proceed to Checkout" button on the bottom corner. <br/>
        - Type in your Delivery Details and Phone number. <br/>
        - Click the "Pay" button, and make payment to complete your Order. <br/>
        - Send the receipt of payment via "WhatsApp" with a screenshot of you order. <br/>
        - Your Order would be delivered. <br/>
        
        <br/>
        <p className='font-semibold'> Payment: </p>
        {/* 🍰 We will discuss the payment on WhatsApp after you place the order. */}
      </div>
    </div>
  )
}

export default About;