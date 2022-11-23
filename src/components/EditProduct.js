import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../api'

const EditProduct = ({ products, navigate, fetchAllProducts, token }) => {
    const { productID } = useParams();

    const [currProduct] = products.filter(product => product.id == productID)
    const { id, title, description, author, pageCount, genre, price, image, quantity } = currProduct;


    const [newTitle, setNewTitle] = useState(title);
    const [newDesc, setNewDesc] = useState(description);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newPageCount, setNewPageCount] = useState(pageCount);
    const [newGenre, setNewGenre] = useState(genre);
    const [newPrice, setNewPrice] = useState(price);
    const [newImage, setNewImage] = useState(image);
    const [newQuantity, setNewQuantity] = useState(quantity);

    async function editProduct() {
        try {
            const editedProduct = {
                id: id,
                title: newTitle,
                description: newDesc,
                author: newAuthor,
                pageCount: newPageCount,
                genre: newGenre,
                price: newPrice,
                image: newImage,
                quantity: newQuantity
            }

            await updateProduct(token, editedProduct);

            navigate('/books');
            fetchAllProducts();
        }
        catch (err) {
            console.error('editproduct FAILED:', err);
        }

    }

    return (
        <form className='edit-form'
            onSubmit={(e) => {
                e.preventDefault();
                editProduct();
            }}>
            <p>Current Title: {title}</p>
            <input
                className='long-input'
                type='text'
                placeholder='updated title'
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <p>Current Description: {description}</p>
            <input
                className='long-input'
                type='text'
                placeholder='updated description'
                onChange={(e) => setNewDesc(e.target.value)}
            />
            <p>Author: </p>
            <input
                type='text'
                placeholder={author}
                onChange={(e) => setNewAuthor(e.target.value)}
            />
            <p>Page Count: </p>
            <input
                type='text'
                placeholder={pageCount}
                onChange={(e) => setNewPageCount(e.target.value)}
            />
            <p>Genre: </p>
            <input
                type='text'
                placeholder={genre}
                onChange={(e) => setNewGenre(e.target.value)}
            />

            <p>Price: </p>
            <div className='price'>
                <p>$</p>
                <input
                    type='text'
                    placeholder={price}
                    onChange={(e) => setNewPrice('$' + e.target.value)}
                />
            </div>

            <p>Cover Image:
                <img className='editProductImage' src={image} />
            </p>
            <input
                type='text'
                placeholder='updated image'
                onChange={(e) => setNewImage(e.target.value)}
            />
            <p>Current Stock: </p>
            <input
                type='text'
                placeholder={quantity}
                onChange={(e) => setNewQuantity(e.target.value)}
            />
            <button
                type='submit'
            >
                Submit Edits
            </button>
        </form>
    )
}

export default EditProduct;