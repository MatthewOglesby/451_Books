import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper } from "@mui/material";
import Badge from "@mui/material/Badge";

const Checkout = ({ products, cartItems, token, fetchAllUserCartItems, navigate, user }) => {
    const [name, setName] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNum, setCardNum] = useState('');

    const { id } = user
    let total = 0;

    return (
        <div className='checkout'>
            <div>

                <h1>Ready to Checkout?</h1>

                <Button
                    variant='contained'
                    onClick={() => navigate(`/cart/${id}`)}
                >
                    Back to Cart
                </Button>

                <h2>Your order:</h2>

                <div className="cart-main-div">
                    {
                        cartItems &&
                        cartItems.map((cartItem) => {
                            const { id: cartId, productId } = cartItem;
                            const [display, setDisplay] = useState("none");
                            const [count, setCount] = useState(1);

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
                                                    // console.log('total before', total)
                                                    total += parseFloat(price)
                                                    // console.log('total after', total)

                                                    return (
                                                        <div key={id}>
                                                            <img
                                                                src={image}
                                                                className="cartProductImage"
                                                            />
                                                            <p>Qty: <Badge color="secondary" badgeContent={count}></Badge> </p>
                                                            <p>Title: {title}</p>
                                                            <p>
                                                                <strong>Price</strong> ${price}
                                                            </p>

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

            <h3 className='checkout-total'>Sub-total: ${total.toFixed(2)}</h3>
            <h3 className='checkout-total'>Tax: ${(total * 0.029).toFixed(2)}</h3>
            <h3 className='checkout-total'>Total: ${((total * 0.029) + total).toFixed(2)}</h3>

            <form className='card-info-form'>
                <input
                    placeholder='card owner name'
                />
                <input
                    placeholder='cvv'
                />
                <input
                    placeholder='card number'
                />
                {/* options for month and year exp date */}
            </form>
            <Button
                id='checkout-button'
                variant='contained'
                sx={{marginTop:'15px'}}
            >
                Checkout
            </Button>
        </div>
    );
}

export default Checkout;