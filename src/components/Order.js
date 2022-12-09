import React, { useState, useEffect } from 'react';


const Order = () => {
  const [confirm, setConfirm] = useState('');

  function randomNumber() {
    setConfirm(((Math.random().toString(36).slice(2)).toUpperCase()))
      // 
  }

  useEffect(() => {
    randomNumber();
  }, []);

  return (
    <div className='orderAll'>
      <div className='orderContainer'>
        <h5 className='orderInfo'>Order Confirmation Number: #{confirm} </h5>
        <h5 className='orderInfo'>Thank you for shopping with 451 Books!</h5>
      </div>
    </div>
  )
}

export default Order;

// (Math.floor(Math.random() * 1e9)) + '-' + (Math.floor(Math.random() * 1e9))