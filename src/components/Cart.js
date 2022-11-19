import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ 
  products, 
  cartItems,
 }) => {
  return (
    <form>
      <div className="cart-main-div">
        <h1>CARTS</h1>

        {/* <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div> */}

        {cartItems.map((cartItem) => {
          const {
            id:cartId,
            order_quantity,
            productId,
            products,
          } = cartItem;

          return (
            <div key={cartId}>
              <div className="inner-cart-div">
                <p>
                  <b> {productId}</b>
                </p>
                <p>{order_quantity}</p>

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

                  return (
                    <div key={id}>
                      <p>
                         {title}
                      </p>
                      <p>
                        <img src={image} />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default Cart;
