import React, { useState } from 'react';
import { Link, Button, Paper } from "@mui/material";
import Swal from 'sweetalert2';
import Badge from "@mui/material/Badge";
import { deleteCartItem } from '../api';

const Checkout = ({cartItems, token, fetchAllUserCartItems, navigate, fetchAllProducts}) => { 

    if (cartItems === undefined) {
        return null;
      }
      let total = 0;

  // if(!user) {
  //   return <Link> to={`/checkout`} </Link>
  // } 

  return (

    <div className='checkoutContainer'>
      <div className='checkout-cart-items'>
        <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>

        {cartItems.map((cartItem) => {

          const { cartId, order_quantity, productId } = cartItem;
          const [count, setCount] = useState(order_quantity);

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
                  <img src={cartItem.image} className="cartProductImage" />
                  <p>
                    Qty: <Badge color='warning' badgeContent={count}></Badge>{" "}
                  </p>
                  <p>Title: {cartItem.title}</p>
                  <p>
                    <strong>Price</strong> ${cartItem.price}
                  </p>
                </Paper>
              </div>
            </div>
          );
        })}

      </div>



      <div className='containerPayment'>
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
          <input type="text" id="cname" name="cardname" placeholder="Jane J. Doe" ></input>
          <p style={{ textAlign: 'left' }} > Credit Card Number </p>
          <input type="text" id="creditcard" name="creditcard" placeholder="1111 2222 3333 4444" ></input>
          <p style={{ textAlign: 'left' }} > Expiration Date </p>
          <input type="text" id="expirationdate" name="expirationdate" placeholder="11/23" ></input>
          <p style={{ textAlign: 'left' }} >CVV </p>
          <input type="text" id="cvv" name="cvv" placeholder="999"></input>

          <button onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: 'Thanks for shopping with us',
              icon: 'success',
              iconColor: 'green',
              confirmButtonColor: 'orange',
              footer: '<a href="/order">Order Confirmation Page</a>',
              closeOnConfirm: false
            }).then(async (result) => {

              
              const clearCart = async () => {
                if (cartItem) {
                  console.log(cartItem)
                  const results = await deleteCartItem(token, cartId)
                  return results;
                }
              }
              if (result.isConfirmed) {
                navigate('/books');
                fetchAllProducts();
                await clearCart();
              }
            })
          }}> Submit Order </button>
        </form>
      </div>
    </div>
  )
}






export default Checkout;