import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem, updateCart } from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Cart = ({ cartItems, token, fetchAllUserCartItems }) => {
  if (cartItems === undefined) {
    return null;
  }

  let total = 0;

  return (
    <form>
      <div>
        <h1>Shopping Cart</h1>
        <div className="cart-main-div">
          <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>

          {cartItems.map((cartItem) => {
           
            const { cartId, order_quantity, productId } = cartItem;
            const [display, setDisplay] = useState("none");
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
                      Qty: <Badge color="info" badgeContent={count}></Badge>{" "}
                    </p>
                    <p>Title: {cartItem.title}</p>
                    <p>
                      <strong>Price</strong> ${cartItem.price}
                    </p>

                    <ButtonGroup>
                      <Button
                        aria-label="reduce"
                        onClick={(event) => {
                          event.preventDefault();
                          const newCount = Math.max(count - 1, 0);
                          setCount(newCount);
                          editCartItem(newCount);
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button
                        aria-label="increase"
                        onClick={(event) => {
                          event.preventDefault();
                          const newCount = Math.max(count + 1);
                          editCartItem(newCount);
                          setCount(newCount);
                        }}
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        type="submit"
                        color="error"
                        variant="outlined"
                        onClick={async () => {
                          
                          await deleteCartItem(token, cartId);
                          fetchAllUserCartItems();
                        
                        }}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </ButtonGroup>

                    <Button
                      variant="outlined"
                      style={{}}
                      onClick={(event) => {
                        event.preventDefault();
                        if (display === "none") {
                          setDisplay("block");
                        } else {
                          setDisplay("none");
                        }
                      }}
                    >
                      Click Description
                    </Button>
                    <div className="activity-box" style={{ display: display }}>
                      <p>{cartItem.description}</p>
                    </div>
                  </Paper>
                </div>
              </div>
            );
          })}

          <span> Subtotal ({cartItems.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: ${total}
            <Link style={{ textDecoration: "none" }} to={`/checkout`}>
              <Button>Proceed to checkout</Button>
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Cart;