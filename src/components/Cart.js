import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ products, cartItems }) => {
  console.log("Testing Cart Items: ", cartItems)

  return (
    <div>
      <h1>CART</h1>
      <div className="cart-main-div">

        {/* <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div> */}

        {cartItems && cartItems.map((cartItem) => {
          const {
            id: cartId,
            order_quantity,
            productId
          } = cartItem;

          return (
            <div key={cartId} className='individualCartContainer'>
              <div className="inner-cart-div">
                <p><b>ProductId {productId}</b></p>
                <p>Quantity {order_quantity}</p>

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
                      <img src={props.image} className='cartProductImage' />
                      <p>{props.title}</p>
                    </div>
                    )
                  }
                }
                )
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
