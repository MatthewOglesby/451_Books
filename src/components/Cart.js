import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import { deleteCartItem ,updateCartItem} from "../api";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Cart = ({ products, cartItems, token ,fetchAllUserCartItems}) => {
  console.log("Testing Cart Items: ", cartItems);

  

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <form>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <h1>Shopping Cart</h1>
          <div className="cart-main-div">
            {/* <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div> */}

            {cartItems &&
              cartItems.map((cartItem) => {
                const { id: cartId, order_quantity, productId } = cartItem;
                const [display, setDisplay] = useState("none");
                const [count, setCount] = useState(order_quantity);

             
                return (
                  <div key={cartId} className="individualCartContainer">
                    <div className="inner-cart-div">
                    
                      <Paper style={{ borderRadius: "1rem" }}>
        
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
                                <img
                                  src={props.image}
                                  className="cartProductImage"
                                />
                                <p>Qty: <Badge color="secondary" badgeContent={count}></Badge> </p>
                                <p>Title: {props.title}</p>
                                <p>
                                  <strong>Price</strong> {props.price}
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
                                      
                                      setCount(count + 1);
                                      
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                  <Button
                                    type="submit"
                                    color="error"
                                    variant="outlined"
                                    onClick={(event) => {
                                      event.preventDefault();
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
                                  <p>{description}</p>
                                </div>
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
      </ClickAwayListener>
    </form>
  );
};

export default Cart;
