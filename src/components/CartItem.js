import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem, updateCart } from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({
  products,
  cartItem,
  token,
  fetchAllUserCartItems,
  navigate,
}) => {
  const { cartId, order_quantity } = cartItem;
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
          <img
            src={cartItem.image}
            className="cartProductImage"
            onClick={() => navigate(`/books/${cartItem.id}`)}
          />
          <br></br>
          <p>
            Qty: <Badge color='warning' badgeContent={count}></Badge>{" "}
          </p>
          <p>Title: {cartItem.title}</p>
          <p>
            <strong>Price</strong> ${((Math.round((cartItem.price * cartItem.order_quantity)*100))/100).toFixed(2)}
          </p>

          <ButtonGroup
          className="button-group-cartItems"
            style={{
              color: "white",
              background: "#9A7269",
              width: "100%",
              borderRadius: "1rem",
            }}
            fullWidth={true}
          >
            <Button
              style={{ color: "white" }}
              variant="text"
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
              style={{ color: "white" }}
              variant="text"
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
              style={{ color: "white" }}
              variant="text"
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
        </Paper>
      </div>
    </div>
  );
};

export default CartItem;
