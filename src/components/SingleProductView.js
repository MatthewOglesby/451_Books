import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart, deleteProduct } from '../api';
import Swal from 'sweetalert2';

import temp from '../coming_soon.JPEG';

const SingleProductView = ({ products, user, fetchAllUserCartItems, navigate, token, fetchAllProducts }) => {
    const { productID } = useParams();
    // console.log(productID)
    // console.log(products)
    // console.log(user)

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productID);
        console.log(currentProduct)
        const { author, title, description, genre, image, quantity, pageCount, price } = currentProduct;
        const { isAdmin, id } = user;
        // console.log(isAdmin)

        return (
            <div className='single-view-div'>
                <div>
                    {
                        image == "" ? (
                            <img className='productImage' src={temp} />
                        )
                            : (
                                <img id="productImageSV" className='productImage' src={image} />
                            )
                    }
                </div>

                <div>
                    <div id="productInfo">
                        <h3 id="productTitle" >{title}</h3>
                        <p className='productAuthor'>By {author}</p>
                        <hr className='seperatingLine' />
                        <p className='productAuthor'>{description}</p>
                        <p className='productAuthor'>Page Count: {pageCount}</p>
                        <p className='productAuthor'>{genre}</p>
                        <hr className='seperatingLine' />
                        <p id="productPrice">${price}</p>
                    </div>

                    <div id="productButtonsDiv">
                        <button
                            className='productButtons'
                            id='add-to-cart'
                            onClick={async (event) => {
                                if (!token) {
                                    Swal.fire({
                                        title: 'Whoops, you need to be logged in to add items to your cart!',
                                        icon: 'warning',
                                        iconColor: 'rgb(252, 157, 93)',
                                        confirmButtonColor: '#d4bcb0',
                                        footer: '<a href="/login">Click here to login!</a>',
                                        customClass: {
                                            footer: 'add-to-cart-whoops'
                                        },
                                        closeOnConfirm: false
                                    })
                                } else {
                                    event.preventDefault();
                                    document.getElementById('add-to-cart').classList.add('pulse')
                                    await addProductToCart(productID, id);
                                    fetchAllUserCartItems();
                                    setTimeout(function () {
                                        document.getElementById('add-to-cart').classList.remove('pulse')
                                    }, 500);
                                }
                            }}
                        >
                            Add to Cart
                        </button>
                        <button className='productButtons' onClick={() => history.back()}>Back</button>
                        {
                            isAdmin ? (
                                <div>
                                    <button className='adminButtons'><Link className='productLink' to={`/books/edit/${productID}`}>Edit Product</Link></button>
                                    <button
                                        className='adminButtons'
                                        id='deleteProductButton'
                                        onClick={async () => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this",
                                                icon: 'warning',
                                                iconColor: 'rgb(255, 115, 0)',
                                                showCancelButton: true,
                                                confirmButtonColor: 'rgb(255, 42, 42)',
                                                cancelButtonColor: 'rgb(24, 23, 23)',
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    const results = await deleteProduct(token, productID);
                                                    navigate('/books');
                                                    fetchAllProducts();
                                                    console.log('successful deletion', results)
                                                    Swal.fire({
                                                        title: 'Deleted!',
                                                        text: 'Your book has been deleted.',
                                                        icon: 'success',
                                                        iconColor: 'rgb(255, 42, 42)',
                                                        confirmButtonColor: 'rgb(255, 42, 42)'
                                                    }
                                                    )
                                                }
                                            })
                                        }}>Delete Book</button>
                                </div>
                            ) : (
                                null
                            )
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        <h1>Waiting for book...</h1>
    }
}

export default SingleProductView;