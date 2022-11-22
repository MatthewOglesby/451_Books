import React from "react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const Navbar = ({ logout, token, user, cartItems }) => {
  const { id } = user;

  if (cartItems === undefined) {
    return null;
  }
  // console.log("navbar",cartItems)
  return (

    <header>
      <nav className="navBox">
        <h3 className="navbarName">451 Books</h3>
        {token ? (
          <>
            <Link to="/" className="navbarLink">Home</Link>
            <Link to="/books" className="navbarLink">Books</Link>
            <Link to="/" onClick={() => { logout(); }} className="navbarLink">Logout</Link>
            <Link to={`/cart/${id}`} className="navbarLink"> <Badge badgeContent={cartItems.length} color="primary"><ShoppingCartCheckoutIcon /> </Badge></Link>
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
