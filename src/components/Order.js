import React, { useState } from 'react';


const Order = () => {
  const [num, setNum] = useState(0);
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = (e) => {
    setNum(randomNumber(1, 1000));
    e.preventDefault();
  }
  return (

    <div>
      <p> Order Confirmed! </p>
      <form>
        <h5 style={{ textAlign: 'center' }}>Order Confirmation Number is: {num} </h5>
        <h5 style={{ textAlign: 'center' }}>Thank you for shopping with 451 Books!</h5>
        <button className='orderbutton' onClick={handleClick}>Get Order Number</button>
      </form>
    </div>
  )
}

export default Order;