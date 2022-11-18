import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SingleProductView = ({products, user}) => {
    const {productId } = useParams();
    const {isAdmin} = user;
    const [currentProduct] = products.filter(product => product._id === productId);
    const {image, title, description, author, pageCount, genre, quantity, price} = currentProduct
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
}

export default SingleProductView;