import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import temp from '../coming_soon.JPEG';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const customTheme = createTheme({
    palette: {
        primary: {
            main: grey[900]
        }
    }
})

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
        <div className='allProductsHere'>
            <div>
                    <div className='containerSearchProducts'>
                        <form
                            className='searchForm'
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}>
                            <div className='returnedFormContent'>
                                <h3 className='searchHeader'>Search For Your Favorite Books</h3>
                                <input
                                    id="outlined-basic"
                                    placeholder="What do you feel like reading?"
                                    className='userSearchInput'
                                    type='text'
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                <h3 style={{
                    textAlign: 'center', color: 'black', fontSize: '35px', textShadow: '5px 5px 10px white', color: 'aliceblue',
                    textShadow: "-2px 4px 8px black",
                    WebkitTextStroke: '.9px black', position:'relative'
                }}>All Books</h3>

                <div className='genre-buttons-div'>
                    <Button
                        style={{ background: 'rgb(124, 77, 124)', height:'50px', width:'150px'  }}
                        variant='contained'
                    >
                        All Books
                    </Button>
                    <Button
                        style={{ background: 'rgb(152, 152, 247)', height:'50px', width:'150px'  }}
                        variant='contained'
                        onClick={() => navigate('books/fiction')}
                    >
                        Fiction
                    </Button>
                    <Button
                        style={{ background: 'rgb(152, 152, 247)', height:'50px', minWidth:'150px'  }}
                        variant='contained'
                        onClick={() => navigate('/books/graphic-novel')}
                    >
                        Graphic Novels
                    </Button>
                    <Button
                        style={{ background: 'rgb(152, 152, 247)', height:'50px', width:'150px'  }}
                        variant='contained'
                        onClick={() => navigate('/books/nonfiction')}
                    >
                        Non-Fiction
                    </Button>
                    <Button
                        style={{ background: 'rgb(152, 152, 247)', height:'50px', width:'150px'  }}
                        variant='contained'
                        onClick={() => navigate('/books/educational')}
                    >
                        Educational
                    </Button>
                    <Button
                        style={{ background: 'rgb(152, 152, 247)', height:'50px', width:'150px'  }}
                        variant='contained'
                        onClick={() => navigate('/books/kids')}
                    >
                        Kids
                    </Button>

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
                                            onClick={() => navigate(`/books/${id}`)}
                                            className='productBox'
                                        >
                                            <Paper className='productContents'>
                                                {
                                                    image == "" ? (
                                                        <img className='productImage' src={temp} />
                                                    )
                                                        : (
                                                            <img className='productImage' src={image} onClick={() => navigate(`/books/${id}`)} />
                                                        )
                                                }
                                                <p className='productTitle'>{title}</p>
                                                <p className='productAuthor'>{author}</p>
                                                <p className='productPrice'>${price}</p>
                                            </Paper>
                                        </div>

                                    )
                                })
                            ) : (
                                <p>Whoops! There was an issue getting our books for you.</p>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Products;