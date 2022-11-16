import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ logout, token, navigate }) => {

    return (
        <div className='homeBoxes'>
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