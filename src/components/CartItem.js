import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem, updateCart } from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ cartItem, token, fetchAllUserCartItems }) => {
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

  console.log("In CartItems");
  return (
    <div key={cartId} className="main-cart-div">
      <div className="individualCartContainer">
        <Paper style={{ borderRadius: "1rem" }}>
          <img src={cartItem.image} className="cartProductImage" />
          <p>
            Qty: <Badge color="info" badgeContent={count}></Badge>{" "}
          </p>
          <p>Title: {cartItem.title}</p>
          <p>
            <strong>Price</strong> ${cartItem.price}
          </p>

          <ButtonGroup fullWidth={true}>
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
             
              onClick={async (event) => {
                event.preventDefault();
                await deleteCartItem(token, cartId);
                fetchAllUserCartItems();
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </ButtonGroup>

          <Button
            fullWidth={true}
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
};

export default CartItem;
