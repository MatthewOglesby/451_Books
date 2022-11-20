import React from "react";
import { Link } from "react-router-dom";
import { Button, Paper,ButtonGroup  } from "@mui/material";
import {deleteCartItem } from "../api"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Cart = ({ products, cartItems, token }) => {
  console.log("Testing Cart Items: ", cartItems);

  return (
    <form
    className="form"
    onSubmit={(event) => {
      event.preventDefault();
     
    }}
  >
    <div>
      <h1>Shopping Cart</h1>
      <div className="cart-main-div">
        {/* <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div> */}

        {cartItems &&
          cartItems.map((cartItem) => {
            const { id: cartId, order_quantity, productId } = cartItem;

            return (
              <div key={cartId} className="individualCartContainer">
                
                <div className="inner-cart-div">
                <Paper style={{borderRadius:"1rem"}}>
                  {products.map((props) => {
                    const {
                      author,
                      title,
                      description,
                      genre,
                      id,
                      image,
                      quantity,
                      pageCount,
                      price,
                    } = props;

                    if (id === productId) {
                      return (
                        <div key={props.id}>
                          <img src={props.image} className="cartProductImage" />
                          <p>Qty: {order_quantity}</p>
                          <p>Title: {props.title}</p>
                          <p>
                            <strong>Price</strong> {props.price}
                          </p>
                          <ButtonGroup>
                          <Button variant="outlined">
                            <RemoveIcon />
                          </Button>
                          <Button >
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
                        </div>
                      );
                    }
                  })}
                  </Paper> 
                </div>
              </div>
            );
          })}
      </div>
    </div>
    </form>
  );
};

export default Cart;
