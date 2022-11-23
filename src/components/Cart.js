import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem } from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Cart = ({ products, cartItems, token, user,cartTotal }) => {
  // console.log("Testing Cart Items: ", cartItems);
 
  if (cartItems === undefined) {
    return null;
  }
// const [total, setTotal] = useState(0)
let total = 0

  const handleClickAway = () => {
    setOpen(false);
  };
//   useEffect(() => {
//     setTotal(cartItems.reduce((prev,curr) => {
//       return 1
//     },0))

// }, []);
  return (
    <form>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <h1>Shopping Cart</h1>
          <div className="cart-main-div">
            <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>

            {cartItems.map((cartItem) => {
              const { cartId, order_quantity, productId } = cartItem;
              const [display, setDisplay] = useState("none");
              const [count, setCount] = useState(1);
            
             total = Math.round((total + (cartItem.price * count))* 100) / 100
              return (
                <div key={cartId} className="individualCartContainer">
                  <div className="inner-cart-div">
                    <Paper style={{ borderRadius: "1rem" }}>
                      <img src={cartItem.image} className="cartProductImage" />
                      <p>
                        Qty:{" "}
                        <Badge color="info" badgeContent={count}></Badge>{" "}
                      </p>
                      <p>Title: {cartItem.title}</p>
                      <p>
                        <strong>Price</strong> ${cartItem.price}
                      </p>

                      <ButtonGroup>
                        <Button
                          aria-label="reduce"
                          onClick={() => {
                            setCount(Math.max(count - 1, 0));
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <Button
                          aria-label="increase"
                          onClick={() => {
                            total= total + cartItem.price
                            setCount(count + 1);
                          }}
                        >
                          <AddIcon />
                        </Button>
                        <Button
                          type="submit"
                          color="error"
                          variant="outlined"
                          onClick={() => {
                            deleteCartItem(token, cartId);
                            location.reload();
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
                      <div
                        className="activity-box"
                        style={{ display: display }}
                      >
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
              <Link  style={{ textDecoration: "none" }}
                    to={`/checkout`}>
              <Button>Proceed to checkout</Button>
              </Link>
            </span>
          
          </div>
        </div>
      </ClickAwayListener>
    </form>
  );
};

export default Cart;
