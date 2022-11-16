import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../api'

const EditProduct = ( {products} ) => {
    const { productId } = useParams();

    // forget how to get this without the product first...
    const [currProduct] = products.filter(product => product.id == productId)
    const { id, title, description, author, pageCount, genre, price, image, quantity } = currProduct;
    
    console.log('CURR-PRODUCT----------', currProduct)

    const [newTitle, setNewTitle] = useState(title);
    const [newDesc, setNewDesc] = useState(description);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newPageCount, setNewPageCount] = useState(pageCount);
    const [newGenre, setNewGenre] = useState(genre);
    const [newPrice, setNewPrice] = useState(price);
    const [newImage, setNewImage] = useState(image);
    const [newQuantity, setNewQuantity] = useState(quantity);

    async function editProduct() {
        try{
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
            fetchAllProducts();
        }
        catch (err) {
            console.error('editproduct FAILED:', err);
        }
        
    }

    return (
        <form onSubmit={ (e) => {
            e.preventDefault();
            editProduct();
        }}>
            <p>Current Book Title: {title}</p>
            <input
                type='text'
                placeholder='updated title'
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <p>Current Book Description: {description}</p>
            <input
                type='text'
                placeholder='updated description'
                onChange={(e) => setNewDesc(e.target.value)}
            />
            <p>Current Book Author: {author}</p>
            <input
                type='text'
                placeholder='updated author'
                onChange={(e) => setNewAuthor(e.target.value)}
            />
            <p>Current Page Count: {pageCount}</p>
            <input
                type='text'
                placeholder='updated page count'
                onChange={(e) => setNewPageCount(e.target.value)}
            />
            <p>Current Book Genre: {genre}</p>
            <input
                type='text'
                placeholder='updated genre'
                onChange={(e) => setNewGenre(e.target.value)}
            />
            <p>Current Selling Price: {price}</p>
            <input
                type='text'
                placeholder='updated price'
                onChange={(e) => setNewPrice(e.target.value)}
            />
            <p>Current Book Image: {image}</p>
            <input
                type='text'
                placeholder='updated image'
                onChange={(e) => setNewImage(e.target.value)}
            />
            <p>Current Stock: {quantity}</p>
            <input
                type='text'
                placeholder='updated stock quantity'
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