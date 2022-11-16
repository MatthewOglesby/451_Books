import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav className='navBox'>
                <h3 className='navbarName'>451 Books</h3>
            {
                    token ? (
                        <>
                            <Link to='/home' className='navbarLink'>Home</Link>
                            <Link to='/products' className='navbarLink'>Books</Link>
                            <Link to='/register' onClick={() => { logout(); }} className='navbarLink'>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/home' className='navbarLink'>Home</Link>
                            <Link to='/products' className='navbarLink'>Books</Link>
                            <Link to='/register' className='navbarLink'>Register</Link>
                            <Link to='/login' className='navbarLink'>Login</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;