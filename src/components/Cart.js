import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem, updateCart } from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CartItem from "./CartItem";
import cartIMG from "../Cart.jpeg";
const Cart = ({ cartItems, token, fetchAllUserCartItems }) => {
  let total = 0;

  if (cartItems === undefined) {
    return null;
  }

  return (
    <div>
      <div className="cartMainContainer">
        <div className="cart-main-div">
          <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>

          {cartItems?.map((cartItem, idx) => {
            console.log("In MAP")
            total = Math.round((total + cartItem.price * cartItem.order_quantity) * 100) / 100;
          return <CartItem key={idx} cartItem={cartItem} token={token} fetchAllUserCartItems={fetchAllUserCartItems}/>
          })}
        </div>
        <div className="cart-total">
          <br></br>
          <span> Subtotal ({cartItems.length}) items</span>

          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: ${total}
            <br></br>
            <Link style={{ textDecoration: "none" }} to={`/checkout`}>
              <Button variant="outlined">Proceed to checkout</Button>
            </Link>
            <br></br>
            <Link style={{ textDecoration: "none" }} to={`/books`}>
              <Button variant="outlined">Continue Shopping</Button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
