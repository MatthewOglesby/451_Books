import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button} from "@mui/material";
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
          <br></br>
          <span> Subtotal ({cartItems.length}) items</span>

          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: ${total}
            <br></br>
            <div className="button-group-cartItems">
            <Link style={{ textDecoration: "none" }} to={`/books`}>
              <Button style={{ color:"white", width:"100%"}} >Continue Shopping <ArrowRightIcon fontSize="large"/></Button>
            </Link>
            </div>
            <br></br>

            <div className="button-group-cartItems">
            <Link style={{color:"white", textDecoration: "none" }} to={`/checkout`}>
              <Button style={{color:"white", width:"100%"}} >Proceed to checkout <PointOfSaleIcon fontSize="small"/></Button>
            </Link>
           </div>
            <br></br>
        
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
