import React, { useState, useEffect } from 'react';


const Order = () => {
  const [num, setNum] = useState(0);

  function randomNumber(min, max) {
    setNum(Math.floor(Math.random() * 1000))
  }

  useEffect(() => {
    randomNumber();
  }, []);

  return (
    <div className='orderAll'>
      <div className='orderContainer'>
        <h5 className='orderInfo'>Order Confirmation Number is: {num} </h5>
        <h5 className='orderInfo'>Thank you for shopping with 451 Books!</h5>
      </div>
    </div>
  )
}

export default Order;