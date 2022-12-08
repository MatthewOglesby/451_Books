import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart, deleteProduct } from '../api';
import Swal from 'sweetalert2';

const SingleProductView = ({ products, user, fetchAllUserCartItems, navigate, token, fetchAllProducts }) => {
    const { productID } = useParams();

    let image2 = '';
    let image3 = '';

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productID);
        console.log(currentProduct)
        const { author, title, description, genre, image, quantity, pageCount, price } = currentProduct;
        const { isAdmin, id } = user;
        // console.log(isAdmin)

        // harry potter and the sorcerers stone
        if (title == "Harry Potter and the Sorcerer's Stone") {
            image2 = 'https://books.google.com/books/content?id=wrOQLV6xB-wC&pg=PT1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0dWP114sBa2ciuo7WqbQHSN0FZAA&w=1280';
            image3 = 'https://books.google.com/books/content?id=wrOQLV6xB-wC&pg=PT19&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1REJBeU68CnEEBEL67GeZDwVumNg&w=1280';
        }

        // life 3.0
        if (title == 'Life 3.0') {
            image2 = 'https://books.google.com/books/publisher/content?id=2hIcDgAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0nGtgXHr2NOPSN-5pr-fWUxpEqwg&w=1280';
            image3 = 'https://books.google.com/books/publisher/content?id=2hIcDgAAQBAJ&pg=PA31&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2bGvfjxPMgoj9Wx_2cwd4VAyYlLQ&w=1280';
        }

        // spongebob goes to the doctor
        if (title == 'SpongeBob Goes to the Doctor') {
            image2 = 'https://books.google.com/books/publisher/content?id=9b1WEAAAQBAJ&pg=PT1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1fDcjmj3YI0fieHqCvc0wGtr7jkw&w=1280';
            image3 = 'https://books.google.com/books/publisher/content?id=9b1WEAAAQBAJ&pg=PT5&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0aPLF-pa1wtZUjdT24v9lGaWZP7Q&w=1280';
        }

        // bone #1
        if (title == "Bone #1: Out from Boneville") {
            image2 = 'https://books.google.com/books/content?id=_N9XRzAruOQC&pg=PP4&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2yQCxJA3OjJw9XnLthvkRlqmONSA&w=1280';
            image3 = 'https://books.google.com/books/content?id=_N9XRzAruOQC&pg=PP5&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2zMzmlrG522IzdpGmjx7TLM2Zp1w&w=1280';
        }

        // the last ronin
        if (title == "Teenage Mutant Ninja Turtles: The Last Ronin") {
            image2 = 'https://books.google.com/books/publisher/content?id=lpgeEAAAQBAJ&pg=PT12&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2RhAizGXRh04Rb8C_YFcU_ryMg8g&w=1280';
            image3 = 'https://books.google.com/books/publisher/content?id=lpgeEAAAQBAJ&pg=PT17&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U23PCKs9M966nws2bTLQBzC1l0NLA&w=1280';
        }

        // web design for dummies
        if (title == "Building a Web Site For Dummies") {
            image2 = 'https://books.google.com/books/publisher/content?id=lUOWAAAAQBAJ&pg=PA14&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0xq2qsFceLAOG6IHdJIBJ9P9Db_g&w=1280';
            image3 = 'https://books.google.com/books/publisher/content?id=lUOWAAAAQBAJ&pg=PA31&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1oG2_HBffl7G8a-GKZ5xRdhxYDlA&w=1280';
        }

        // chainsaw man vol 1
        if (title == "Chainsaw Man, Vol. 1") {
            image2 = 'https://books.google.com/books/publisher/content?id=54T-DwAAQBAJ&pg=PA5&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2OQFV2lRrCWJ8beYGUMiwxyP0HqA&w=1280';
            image3 = 'https://books.google.com/books/publisher/content?id=54T-DwAAQBAJ&pg=PA11&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1wjGzmwxNim2NpKZ1kkPKfSkrvMg&w=1280';
        }


        return (
            <div className='single-view-div'>
                <div className='img-slideshow'>

                    <div className="imgs">

                        {
                            image2 == '' && image3 == '' ? (
                                <img id="productImageSV" className='productImage' src={image} />
                            ) : (
                                <>
                                    <div id="img1">
                                        <img className='slideImage' src={image} />
                                    </div>
                                    <div id="img2">
                                        <img className='slideImage' src={image2} />
                                    </div>
                                    <div id="img3">
                                        <img className='slideImage' src={image3} />
                                    </div>
                                </>
                            )
                        }

                    </div>

                    {
                        image2 == '' && image3 == '' ? (
                            null
                        ) : (
                            <>
                                <a href='#img1'>1</a>
                                <a href='#img2'>2</a>
                                <a href='#img3'>3</a>
                            </>
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
                        {
                            isAdmin ? (
                                <p className='productAuthor' style={{fontSize: 30, textAlign:'center'}}><strong>---Current Stock: {quantity}---</strong></p>
                            ) : (
                                null
                            )
                        }
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
                        <button className='productButtons' onClick={() => navigate('/books')}>Back</button>
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