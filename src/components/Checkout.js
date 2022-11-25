import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, ButtonGroup, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Checkout = ({ products, cartItems, token, fetchAllUserCartItems, navigate, user }) => {
    const { id } = user

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
                            let total = 0;

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
                                                    total += parseFloat(price)
                                                    console.log('total', total)

                                                    return (
                                                        <div key={id}>
                                                            <img
                                                                src={image}
                                                                className="cartProductImage"
                                                            />
                                                            <p>Qty: <Badge color="secondary" badgeContent={count}></Badge> </p>
                                                            <p>Title: {title}</p>
                                                            <p>
                                                                <strong>Price</strong> ${parseFloat(price)}
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
            <h3 style={{ marginTop: '50px', marginBottom: '15px', fontWeight: 'bold' }}>Sub-total:</h3>
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
            >
                Checkout
            </Button>
        </div>
    );
}

export default Checkout;