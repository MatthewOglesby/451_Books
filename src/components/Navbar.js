import React from "react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import logo from '../header_logo-2.jpeg';

const Navbar = ({ logout, token, user, cartItems, fetchAllUserCartItems }) => {
  const { id } = user;

  if (cartItems === undefined) {
    return (
      <header >
        <nav className="navBox">
          <img src={logo} className='navbarLogo'/>
          <Link to="/" className="navbarLink">Home</Link>
          <Link to="/books" className="navbarLink">Books</Link>
          <Link to="/register" className="navbarLink">Register</Link>
          <Link to="/login" className="navbarLink">Login</Link>
          
        </nav>
      </header>
    );
  }


  return (
    <header>
      <nav className="navBox">
        <img src={logo} className='navbarLogo'/>
        {token ? (
          <>
            <Link to="/" onClick={() => { fetchAllUserCartItems(); }} className="navbarLink">Home</Link>
            <Link to="/books" onClick={() => { fetchAllUserCartItems(); }} className="navbarLink">Books</Link>
            <Link to="/" onClick={() => { logout(); }} className="navbarLink">Logout</Link>
            <Link to={`/cart/${id}`} className="navbarLink"> <Badge badgeContent={cartItems.length} color='warning'><ShoppingCartCheckoutIcon /> </Badge></Link>
          </>
        ) : (
          <>
            <Link to="/" className="navbarLink">Home</Link>
            <Link to="/books" className="navbarLink">Books</Link>
            <Link to="/register" className="navbarLink">Register</Link>
            <Link to="/login" className="navbarLink">Login</Link>
            <Link to={`/cart/${id}`} className="navbarLink"><ShoppingCartCheckoutIcon /></Link>

          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;