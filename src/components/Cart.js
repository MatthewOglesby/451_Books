import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ products, cartItems }) => {
  console.log("Testing Cart Items: ",cartItems)
  
  return (
    <form>
      <div className="cart-main-div">
        <h1>CARTS</h1>

        {/* <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div> */}

        {cartItems && cartItems.map((cartItem) => {
          const {
            id:cartId,
            order_quantity,
            productId,
            
          } = cartItem;
      
          return (
            <div key={cartId}>
              <div className="inner-cart-div">
                <p>
                  <b>ProductId {productId}</b>
                </p>
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
                  
                    if( id === productId ) {
                      return( <div key={props.id}>
                        <p>
                          Title: {props.title}
                        </p>
                        <p>
                          <img src={props.image} className='productImage'/>
                        </p>
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
    </form>
  );
};

export default Cart;
