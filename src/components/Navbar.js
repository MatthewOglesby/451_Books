import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const Navbar = ({ logout, token, user, cartItems }) => {
  const { id } = user;
  return (
    <header>
      <nav className="navBox">
        <h3 className="navbarName">451 Books</h3>
        {token ? (
          <>
            <Link to="/" className="navbarLink">Home</Link>
            <Link to="/products" className="navbarLink">Books</Link>
            <Link to="/register" onClick={() => {logout();}} className="navbarLink">Logout</Link>
            <Link to={`/cart/${id}`} className="navbarLink"><ShoppingCartCheckoutIcon /></Link>
          </>
        ) : (
          <>
            <Link to="/" className="navbarLink">Home</Link>
            <Link to="/products" className="navbarLink">Books</Link>
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
