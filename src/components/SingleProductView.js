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
                                <img id="productImageSV" className='productImage' src={image} />
                            )
                    }
                </div>

                <div>
                    <div id="productInfo">
                        <h3 id="productTitle" >{title}</h3>
                        <p className='productAuthor'>By {author}</p>
                        <hr className='seperatingLine'/>
                        <p className='productAuthor'>{description}</p>
                        <p className='productAuthor'>Page Count: {pageCount}</p>
                        <p className='productAuthor'>{genre}</p>
                        <hr className='seperatingLine'/>
                        <p id="productPrice">${price}</p>
                </div>

                <div id="productButtonsDiv">
                        <button className='productButtons' onClick={async (event) => {event.preventDefault(); await addProductToCart(productID, id); fetchAllUserCartItems();}}>Add to Cart</button>
                        <button className='productButtons'><Link className='productLink' to='/books'>Back</Link></button>
                {
                    isAdmin ? (
                        <button className='productButtons'><Link className='productLink' to={`/books/edit/${productID}`}>Edit Product</Link></button>
                    ) : (
                        <p></p>
                    )
                }
                </div>
                </div>
            </div>
        )
    } else {
        <h1>Waiting for book...</h1>
    }
}

export default SingleProductView;