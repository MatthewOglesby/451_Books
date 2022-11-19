import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ logout, token, navigate, user }) => {
    const { isAdmin } = user
    // console.log(user)
    // console.log(isAdmin)

    return (
        <div className='homeBoxes'>
            {
                isAdmin ? (
                    <>
                        <button className='homeBox' onClick={() => navigate('all-users')}>All Users</button>
                        <button className='homeBox' onClick={() => navigate('addProduct')}>Add Book</button>
                    </>
                ) : (
                    <p></p>
                )
            }
            {
                token ? (
                    <>
                        <button className='homeBox' onClick={() => navigate('products')}>Books</button>
                        <button className='homeBox' onClick={() => { logout(); }}>Logout</button>
                    </>
                ) : (
                    <>
                        <button className='homeBox' onClick={() => navigate('products')}>Books</button>
                        <button className='homeBox' onClick={() => navigate('register')}>Register</button>
                        <button className='homeBox' onClick={() => navigate('login')}>Login</button>
                    </>
                )
            }
        </div>
    )
}

export default Home;
