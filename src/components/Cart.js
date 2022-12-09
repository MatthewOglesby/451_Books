import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CartItem from "./CartItem";
import cartIMG from "../Cart.jpeg";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Cart = ({ cartItems, token, fetchAllUserCartItems, user, navigate }) => {

  let total = 0;
  const { isAdmin, id } = user;

  if (cartItems === undefined) {
    return null;
  }

  return (

    <div className="main-cart-div">
      {
        !token ? (
          <>
            <img
              src={cartIMG}
              style={{ paddingTop: "2.89%"}}
              width={"100%"}
              alt="Cart IMG"
            />
            <h1 id='cart-warning-h1'>This page is only visible when you're logged in</h1>
            <Link to='/login' id='cart-login-link'>Click here to get reading!</Link>
          </>

        ) : (
          <>
            <img
              src={cartIMG}
              style={{ paddingTop: "2.89%" }}
              width={"100%"}
              alt="Cart IMG"
            />

            <div className="cartMainContainer">
              <div className="cart-main-div">

                {cartItems?.map((cartItem, idx) => {
                  console.log("In MAP");
                  total =
                    Math.round(
                      (total + cartItem.price * cartItem.order_quantity) * 100
                    ) / 100;
                  return (
                    <CartItem
                      key={idx}
                      cartItem={cartItem}
                      token={token}
                      navigate={navigate}
                      fetchAllUserCartItems={fetchAllUserCartItems}
                    />
                  );
                })}
              </div>

              <div className="cart-total">

                <span style={{ fontSize: 27 }}>
                  Subtotal ({cartItems.length}) items: ${total.toFixed(2)}
                  <br></br>
                  <em style={{ fontSize: 20 }}>Total calculated at checkout</em>
                  <br></br>
                  <br></br>
                  <div className="button-group-cartItems">
                    <Link style={{ color: "white", textDecoration: "none" }} to={`/checkout`}>
                      <Button style={{ fontSize: 20, color: "white", width: "100%" }} >Proceed to checkout <PointOfSaleIcon fontSize="small" /></Button>
                    </Link>
                  </div>
                  <p style={{ fontSize: 25 }}>OR</p>
                  <div className="button-group-cartItems">
                    <Link style={{ textDecoration: "none" }} to={`/books`}>
                      <Button style={{ fontSize: 20, color: "white", width: "100%" }} >Continue Shopping <ArrowRightIcon fontSize="large" /></Button>
                    </Link>
                  </div>
                  <br></br>
                  <h1 className="cart-text-div" style={{ fontFamily: 'Droid Sans', cursor: 'default' }}>Cart</h1>
                </span>
              </div>

            </div>
          </>

        )
      }
    </div>
  );
};

export default Cart;
