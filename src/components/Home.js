import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ logout, token, navigate, user }) => {
    const { isAdmin } = user
    // console.log(user)
    // console.log(isAdmin)

    return (
        <div className='homeContainer'>
            <div className='homeBoxes'>
                {
                    isAdmin ? (
                        <>
                            <button className='homeBox' onClick={() => navigate('all-users')}>All Users</button>
                            <button className='homeBox' onClick={() => navigate('add-product')}>Add Book</button>
                        </>
                    ) : (
                        <p></p>
                    )
                }
                {
                    token ? (
                        <>
                            <button className='homeBox' onClick={() => navigate('books')}>Books</button>
                            <button className='homeBox' onClick={() => { logout(); }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className='homeBox' onClick={() => navigate('books')}>Books</button>
                            <button className='homeBox' onClick={() => navigate('register')}>Register</button>
                            <button className='homeBox' onClick={() => navigate('login')}>Login</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Home;