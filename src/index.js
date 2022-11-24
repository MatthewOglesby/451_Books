import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { getAllProducts, getUserDetails, getUserCart, getAllUsers } from './api';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Products,
    Navbar,
    AddProduct,
    Cart,
    Checkout,
    EditCart,
    EditProduct,
    Home,
    Login,
    Register,
    SingleProductView,
    AllUsers
} from './components'

const App = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    // console.log('Testing User: ', user)

    const navigate = useNavigate();

    async function getMe() {
        const storedToken = window.localStorage.getItem('token')
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }

        const results = await getUserDetails(token)
        // console.log('Testing getMe results: ', results)
        if (results) {
            setUser(results);
            setUsername(results.username);
            setUserId(results.id)
        } else {
            console.log('error getting user results in the getMe function')
        }
    }

    function logout() {
        window.localStorage.removeItem('token');
        setToken('')
        setUser({});
        navigate('/')
    }

    async function fetchAllProducts() {
        const results = await getAllProducts();
        setProducts(results);
    }

    async function fetchAllUserCartItems() {
        const results = await getUserCart(token, user.id)
        // console.log("Testing results from getting cart: ",results)
        setCartItems(results)
    }

    async function fetchAllUsers() {
        const results = await getAllUsers();
        // console.log(results)
        setUsers(results);
    }

    useEffect(() => {
        fetchAllUserCartItems();
    }, [user]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token} user={user} cartItems={cartItems} fetchAllUserCartItems={fetchAllUserCartItems} />
            <Routes>
                <Route
                    path='/'
                    element={<Home
                        navigate={navigate}
                        token={token}
                        logout={logout}
                        user={user}
                        fetchAllUserCartItems={fetchAllUserCartItems}
                    />}
                />
                <Route
                    path='/books'
                    element={<Products
                        products={products}
                        fetchAllProducts={fetchAllProducts}
                        navigate={navigate}
                    />}
                />
                <Route
                    path='/:title'
                />
                <Route
                    path='/all-users'
                    element={<AllUsers
                        navigate={navigate}
                        fetchAllUsers={fetchAllUsers}
                        users={users}
                    />}
                />
                <Route
                    path='/login'
                    element={<Login
                        navigate={navigate}
                        setToken={setToken}
                    />}
                />
                <Route
                    path='/register'
                    element={<Register
                        token={token}
                        navigate={navigate}
                        setToken={setToken}
                    />}
                />
                <Route
                    path='/books/edit/:productID'
                    element={<EditProduct
                        products={products}
                        navigate={navigate}
                        fetchAllProducts={fetchAllProducts}
                        token={token}
                    />}
                />
                <Route
                    path='/books/:productID'
                    element={<SingleProductView
                        products={products}
                        user={user}
                        navigate={navigate}
                        fetchAllUserCartItems={fetchAllUserCartItems}
                    />}
                />
                <Route
                    path='/add-product'
                    element={<AddProduct
                        fetchAllProducts={fetchAllProducts}
                        navigate={navigate}
                        products={products}
                        token={token}
                    />}
                />
                <Route
                    path='/edit-cart'
                />
                <Route
                    path='/cart/:id'
                    element={<Cart
                        token={token}
                        user={user}
                        cartItems={cartItems}
                        fetchAllUserCartItems={fetchAllUserCartItems}
                        products={products}
                        navigate={navigate}
                    />}
                />
                <Route
                    path='/checkout'
                    element={<Checkout/>}
                />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <React.Fragment>
        {/* CssBaseLine assist with layout */}
        <CssBaseline/>
        <BrowserRouter>
            <App />
        </BrowserRouter>
       
    </React.Fragment>
);