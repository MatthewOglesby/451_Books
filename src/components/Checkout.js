import React, { useState } from 'react';
import { Paper } from "@mui/material";
import Swal from 'sweetalert2';
import { deleteCartItem } from '../api';
import Badge from "@mui/material/Badge";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';


const Checkout = ({ cartItems, token, fetchAllUserCartItems, navigate, fetchAllProducts }) => {
  const [region, setRegion] = useState('West');
  const [isLoading, setIsLoading] = useState(false)

  if (cartItems === undefined) {
    return null;
  }
  let total = 0;

  let shippingW = 6.99;
  let shippingC = 5.99;
  let shippingE = 7.99;

  let taxW = 0.0725;
  let taxM = 0.029;
  let taxC = 0.07;
  let taxE = 0.06;

  // if(!user) {
  //   return <Link> to={`/checkout`} </Link>
  // } 

  const deleteFunc = () => {
    cartItems.map(async (item) => {
      await deleteCartItem(token, item.cartId);
    })
    // fetch all the users cart items 
  }

  function handleChange(ev) {
    setRegion(ev.target.value)
    console.log('-region---------', region)
  }

  return (

    <div className='checkoutContainer'>
      <div className='checkout-cart-items'>
        <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>

        {cartItems.map((cartItem) => {

          const { cartId, order_quantity, productId } = cartItem;
          const [count, setCount] = useState(order_quantity);


          const clearCart = async () => {
            if (cartItem) {
              const results = await deleteCartItem(token, cartId)
              return results;
            } else {
              console.log('unable to delete cart')
            }
          }

          async function editCartItem(newCount) {

            const updatedCartItems = {
              order_quantity: newCount,
            };
            const result = await updateCart(token, updatedCartItems, cartId);
            console.log(result);

            fetchAllUserCartItems();

          }

          total = Math.round((total + cartItem.price * count) * 100) / 100;
          return (
            <div key={cartId} className="individualCartContainer">
              <div className="inner-cart-div">
                <Paper style={{ borderRadius: "1rem" }}>
                  <img src={cartItem.image} className="cartProductImage" onClick={() => navigate(`/books/${id}`)} />
                  <p>
                    Qty: <Badge color='warning' badgeContent={count}></Badge>{" "}
                  </p>
                  <p>Title: {cartItem.title}</p>
                  <p>
                    <strong>Price</strong> ${((Math.round((cartItem.price * cartItem.order_quantity) * 100)) / 100).toFixed(2)}
                  </p>
                </Paper>
              </div>
            </div>
          );
        })}

      </div>



      <div className='containerPayment'>
        <div className='totals-checkout'>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'white', fontWeight: 'bold' }}>Please Select Shipping Region</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={region}
              name="radio-buttons-group"
              onChange={(ev) => {
                handleChange(ev)

              }}
            >
              <FormControlLabel value="West" control={<Radio />} label="West" />
              <FormControlLabel value="Mountain" control={<Radio />} label="Mountain" />
              <FormControlLabel value="Central" control={<Radio />} label="Central" />
              <FormControlLabel value="East" control={<Radio />} label="East" />
            </RadioGroup>
          </FormControl>
          <p>Subtotal: ${total}</p>
          {
            region == 'West' ? (
              <>
                <p>Shipping: ${shippingW}</p>
                <p>Taxes ({(taxW * 100).toFixed(1)}%) : ${(total * taxW).toFixed(2)}</p>
                <p style={{ fontSize: 18, borderTop: '2px solid black', paddingTop: 12, marginTop: 0 }}>Total: ${(total + (total * taxW) + shippingW).toFixed(2)}</p>
              </>
            ) : (
              null
            )
          }
          {
            region == 'Mountain' ? (
              <>
                <p>Shipping: <em>Free</em> </p>
                <p>Taxes ({(taxM * 100).toFixed(1)}%) : ${(total * taxM).toFixed(2)}</p>
                <p style={{ fontSize: 18, borderTop: '2px solid black', paddingTop: 12, marginTop: 0 }}>Total: ${(total + (total * taxM)).toFixed(2)}</p>
              </>
            ) : (
              null
            )
          }
          {
            region == 'Central' ? (
              <>
                <p>Shipping: ${shippingC} </p>
                <p>Taxes ({(taxC * 100).toFixed(1)}%) : ${(total * taxC).toFixed(2)}</p>
                <p style={{ fontSize: 18, borderTop: '2px solid black', paddingTop: 12, marginTop: 0 }}>Total: ${(total + (total * taxC) + shippingC).toFixed(2)}</p>
              </>
            ) : (
              null
            )
          }
          {
            region == 'East' ? (
              <>
                <p>Shipping: ${shippingE} </p>
                <p>Taxes ({(taxE * 100).toFixed(1)}%) : ${(total * taxE).toFixed(2)}</p>
                <p style={{ fontSize: 18, borderTop: '2px solid black', paddingTop: 12, marginTop: 0 }}>Total: ${(total + (total * taxE) + shippingE).toFixed(2)}</p>
              </>
            ) : (
              null
            )
          }





        </div>

        <form
          className='containerCheckout'
        >
          <h4 style={{ textAlign: 'left' }} >Enter Credit Card Information Below</h4>

          <p> First Name </p>
          <input type="text" id="fname" name="firstname" placeholder="Jane"></input>

          <p> Last Name </p>
          <input type="text" id="lname" name="lastname" placeholder="Doe"></input>

          <p> Shipping Address </p>
          <input type="text" id="saddress" name="shippingaddress" placeholder="1234 Street"></input>


          <p> City </p>
          <input type="text" id="city" name="city" placeholder="New Orleans" ></input>

          <p> State </p>
          <input type="text" id="state" name="state" placeholder="LA" ></input>

          <p> Zip Code </p>
          <input type="text" id="zcode" name="zipcode" placeholder="11111" ></input>
        </form>

        <form className='containerCheckouts'>
          <p style={{ textAlign: 'left' }} > Name on Card </p>
          <input type="text" id="cname" name="cardname" placeholder="Jane J. Doe"></input>

          <p style={{ textAlign: 'left' }}> Credit Card Number </p>
          <input type="text" id="creditcard" name="creditcard" placeholder="1111 2222 3333 4444" ></input>

          <p style={{ textAlign: 'left' }} > Expiration Date </p>
          <input type="text" id="expirationdate" name="expirationdate" placeholder="11/23" ></input>

          <p style={{ textAlign: 'left' }} >CVV </p>
          <input type="text" id="cvv" name="cvv" placeholder="999"></input>

          
            {
              isLoading ? (
                <div id='loader' style={{ textAlign: 'center', marginTop: '30px', marginBottom: '-20px' }}>
                <CircularProgress color="success" />
                </div>
              ) : (
                <button className='submitOrderCheckout' onClick={(e) => {
                  e.preventDefault();
                  setTimeout(function () {
                    setIsLoading(true)
                  }, 350);
                  setTimeout(function () {
                    setIsLoading(false)
                  }, 2500);
                  setTimeout(function () {
                    Swal.fire({
                      title: 'Order Received!',
                      icon: 'success',
                      iconColor: 'green',
                      confirmButtonColor: 'orange',
                      confirmButtonText: 'return to home',
                      footer: '<a href="/order">View Order Confirmation</a>',
                      closeOnConfirm: false
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        deleteFunc();
                        fetchAllUserCartItems();
                        navigate('/books');
                      }
                    })
        
                  }, 2500);
                  
                  
                }}> Submit Order </button>
              )
            }

        </form>

      </div>
    </div>
  )
}

export default Checkout;