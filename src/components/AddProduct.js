import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { createProduct } from '../api';

const AddProduct = ({ fetchAllProducts, navigate, token }) => {
    const [createTitle, setTitle] = useState('');
    const [createDesc, setDesc] = useState('');
    const [createAuthor, setAuthor] = useState('');
    const [createPageCount, setPageCount] = useState('');
    const [createGenre, setGenre] = useState('');
    const [createPrice, setPrice] = useState('');
    const [createImage, setImage] = useState('');
    const [createQuantity, setQuantity] = useState(0);

    async function addProduct() {
        try {
            const newProduct = {
                token: token,
                title: createTitle,
                description: createDesc,
                author: createAuthor,
                pageCount: createPageCount,
                genre: createGenre,
                price: createPrice,
                image: createImage,
                quantity: createQuantity
            }

            const results = await createProduct(token, newProduct)
            console.log('createProduct RESULTS------', results)
            if (!results.id) {
                // temporary
                alert('error adding product')
            }
            else {
                navigate('/books')
                fetchAllProducts();
            }

        }
        catch (err) {
            console.error('addProduct FAILED:', err);
        }
    }

    return (
        <div className='addingProductMainContainer'>
            <div className='formContainerAddProduct'>
            <h3 style={{ textAlign: 'center' }}>Add Product to Inventory</h3>

            <form className='addProductForm'>
                <input
                className='addInput'
                    type='text'
                    placeholder='Book Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                className='addInput'
                    type='text'
                    placeholder="Book Description"
                    onChange={(e) => setDesc(e.target.value)}
                />
                <input
                className='addInput'
                    type='text'
                    placeholder="Name of Author"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                className='addInput'
                    type='text'
                    placeholder="Book Page Count"
                    onChange={(e) => setPageCount(e.target.value)}
                />
                <input
                className='addInput'
                    type='text'
                    placeholder="Book Genre"
                    onChange={(e) => setGenre(e.target.value)}
                />

                <div className='price'>
                    <p>$</p>
                    <input
                    className='addInput'
                        type='text'
                        placeholder="Price"
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <input
                    type='text'
                    className='addInput'
                    placeholder="Image for Book"
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type='text'
                    className='addInput'
                    placeholder="Inventory Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                className='addProductButton'
                    onClick={(e) => {
                        e.preventDefault();
                        addProduct();
                    }}>Add Book</button>

            </form>
            </div>
        </div>
    )
}

export default AddProduct;