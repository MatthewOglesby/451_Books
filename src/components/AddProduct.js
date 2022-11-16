import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduct = ( {fetchAllProducts} ) => {
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

            const results = await createNewRoutine(token, newProduct)

            if (!results.id) {
                // temporary
                alert('product exists')
            }
            else {
                fetchAllProducts();
            }

        }
        catch (err) {
            console.error('addProduct FAILED:', err);
        }
    }

    return (
        <div>
            <h3>Add Product to Inventory</h3>

            <form>
                <input
                    type='text'
                    placeholder='Book Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Book Description"
                    onChange={(e) => setDesc(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Name of Author"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Book Page Count"
                    onChange={(e) => setPageCount(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Book Genre"
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Image for Book"
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Inventory Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addProduct();
                    }}>Add Book</button>

            </form>
        </div>
    )
}

export default AddProduct;