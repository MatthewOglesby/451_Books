import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../api';

import temp from '../coming_soon.JPEG';

const SingleProductView = ({ products, user, fetchAllUserCartItems, navigate }) => {
    const { productID } = useParams();
    // console.log(productID)
    // console.log(products)
    // console.log(user)

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productID);
        // console.log(currentProduct)
        const { author, title, description, genre, image, quantity, pageCount, price } = currentProduct;
        const { isAdmin, id } = user;
        // console.log(isAdmin)

        return (
            <div className='single-view-div'>
                <div>
                    {
                        image == "" ? (
                            <img className='productImage' src={temp} />
                        )
                            : (
                                <img className='productImage' src={image} />
                            )
                    }
                    <h3>{title}</h3>
                    <p>By {author}</p>
                    <p>{description}</p>
                    <p>Page Count: {pageCount}</p>
                    <p>Genre: {genre}</p>
                    <p>Price: ${price}</p>
                    <button  onClick={async (event) => {event.preventDefault(); await addProductToCart(productID, id); fetchAllUserCartItems();}}>Add to Cart</button>
                    <Link to='/books'>Back</Link>

                </div>
                {
                    isAdmin ? (
                        <Link to={`/books/edit/${productID}`}>Edit Product</Link>
                    ) : (
                        <p></p>
                    )
                }
            </div>
        )
    } else {
        <h1>Waiting for book...</h1>
    }
}

export default SingleProductView;