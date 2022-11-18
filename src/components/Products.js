import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products }) => {

    // console.log(products)

    return (
        <div className='allProducts'>
            {
                products ?
                    (
                        products.map((product) => {
                            const { author, title, description, genre, id, image, quantity, pageCount, price } = product;
                            // const [display, setDisplay] = useState('none')
                            return (
                                <div key={id}>
                                    <div className='productBox'>
                                        <img className='productImage' src={image} />
                                        <p>{title}</p>
                                        <p>{author}</p>
                                        <p>{description}</p>
                                    </div>
                                    <Link to={`/products/${id}`}>View</Link>
                                </div>
                                
                            )
                        })
                    ) : (
                        <p></p>
                    )
            }
        </div>
    )
}

export default Products;