import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, TextField, Button } from '@mui/material';
import temp from '../coming_soon.JPEG';

const Fantasy = ({ products, navigate }) => {
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

    return (
        <div className='allProductsHere'>
            <div className='searchBarImageContainer'>
                <div className='containerSearchProducts'>
                    <form
                        className='searchForm'
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}>
                        <div className='returnedFormContent'>
                            <h3 className='searchHeader'>Search For Products Here</h3>
                            <TextField
                                id="standard-basic" label="(i.e. genre, title, author, description)" variant="standard"
                                className='userSearchInput'
                                type='text'

                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <h3>Genre</h3>

            <div className='genre-buttons-div'>
                <Button
                    style={{ background: 'purple' }}
                    variant='contained'
                    onClick={() => navigate('/books')}
                >
                    All Books
                </Button>
                <Button
                    style={{ background: 'rgb(152, 152, 247)' }}
                    variant='contained'
                >
                    Fantasy
                </Button>
                <Button
                    style={{ background: 'rgb(152, 152, 247)' }}
                    variant='contained'
                    onClick={() => navigate('/books/nonfiction')}
                >
                    Non-Fiction
                </Button>
                <Button
                    style={{ background: 'rgb(152, 152, 247)' }}
                    variant='contained'
                    onClick={() => navigate('/books/kids')}
                >
                    Kids
                </Button>
            </div>

            <h3 style={{ textAlign: 'center', fontSize: '25px' }}>Fantasy</h3>
            <div className='allProducts'>
                {
                    products ?
                        (
                            productsToDisplay.map((product) => {
                                const { author, title, description, genre, id, image, quantity, pageCount, price } = product;
                                return (
                                    genre == 'Fantasy' ?
                                        <div
                                            key={id}
                                            className='productBox'
                                        >
                                            <Paper>
                                                {
                                                    image == "" ? (
                                                        <img className='productImage' src={temp} />
                                                    )
                                                        : (
                                                            <img className='productImage' src={image} onClick={() => navigate(`/books/${id}`)} />
                                                        )
                                                }
                                                <p>{title}</p>
                                                <p>{author}</p>
                                                <p>${price}</p>
                                                <Link to={`/books/${id}`}>View</Link>
                                            </Paper>
                                        </div>
                                        :
                                        null
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

export default Fantasy;