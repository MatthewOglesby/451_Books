import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SingleProductView = ({ products, user }) => {
    const { productID } = useParams();
    // console.log(productID)
    console.log(products)
    // console.log(user)

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productID);
        console.log(currentProduct)
        const { author, title, description, genre, id, image, quantity, pageCount, price } = currentProduct;
        const { isAdmin } = user;
        console.log(isAdmin)

        return (
            <div>
                <div>
                    <img className='productImage' src={image} />
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Author: {author}</p>
                    <p>Page Count: {pageCount}</p>
                    <p>Genre: {genre}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price}</p>
                    <Link to='/products'>Back</Link>
                </div>
                {
                    isAdmin ? (
                        <Link to='/edit-product'>Edit Product</Link>
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