import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav>
            {
                    token ? (
                        <>
                            <Link to='/home'>Home</Link>
                            <Link to='/products'>Books</Link>
                            <Link to='/register' onClick={() => { logout(); }}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/products'>Books</Link>
                            <Link to='/register'>Register</Link>
                            <Link to='/login'>Login</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;