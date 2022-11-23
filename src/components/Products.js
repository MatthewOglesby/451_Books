import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import temp from '../coming_soon.JPEG';

const Products = ({ products, navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const productMatches = (product, string) => {
        const { author, title, description, genre, id, image, quantity, pageCount, price } = product;
        title.toLowerCase();

        if ((title.toLowerCase().includes(string)) || author.toLowerCase().includes(string) || description.toLowerCase().includes(string) || genre.toLowerCase().includes(string)) {
            return product;
        }
    }

    const filteredProducts = products.filter(product => productMatches(product, searchTerm));

    const productsToDisplay = searchTerm.length ? filteredProducts : products;

    // console.log(products)

    return (
        <div>
            <div className='containerSearchProducts'>
                <form
                    className=''
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                    <div className='returnedFormContent'>
                        <h3 className='searchHeader'>Search For Products Here</h3>
                        <input
                            className='userSearchInput'
                            type='text'
                            placeholder='(i.e. title, author, description)'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className='allProducts'>
                {
                    products ?
                        (
                            productsToDisplay.map((product) => {
                                const { author, title, description, genre, id, image, quantity, pageCount, price } = product;
                                return (
                                        <div 
                                        key={id}
                                        className='productBox'
                                        >
                                                {
                                                    image == "" ? (
                                                        <img className='productImage' src={temp} />
                                                    )
                                                    : (
                                                        <img className='productImage' src={image} />
                                                    )
                                                }

                                                <p>{title}</p>
                                                <p>{author}</p>
                                                <p>{description}</p>
                                                <p>${price}</p>
                                                <Link to={`/books/${id}`}>View</Link>

                                        </div>
 
                                )
                            })
                        ) : (
                            <p></p>
                        )
                }
            </div>
        </div>
    )
}

export default Products;