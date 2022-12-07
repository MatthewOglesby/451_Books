import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { getAllProducts, getUserDetails, getUserCart, getAllUsers } from './api';
import {
    Products,
    Navbar,
    AddProduct,
    Cart,
    Checkout,
    EditProduct,
    Home,
    Login,
    Register,
    SingleProductView,
    AllUsers,
    Fiction,
    GraphicNovel,
    NonFiction,
    Kids,
    Educational,
    Order
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
        console.log("Testing results from getting cart: ",results)
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
        <div className='routesDiv'>
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
                        token={token}
                        fetchAllProducts={fetchAllProducts}
                    />}
                />
                <Route
                    path='/books/fiction'
                    element={<Fiction
                        navigate={navigate}
                        products={products}
                    />}
                />
                <Route
                    path='/books/graphic-novel'
                    element={<GraphicNovel
                        navigate={navigate}
                        products={products}
                    />}
                />
                <Route
                    path='/books/nonfiction'
                    element={<NonFiction
                        navigate={navigate}
                        products={products}
                    />}
                />
                <Route
                    path='/books/educational'
                    element={<Educational
                        navigate={navigate}
                        products={products}
                    />}
                />
                <Route
                    path='/books/kids'
                    element={<Kids
                        navigate={navigate}
                        products={products}
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
                    element={<Checkout
                        cartItems={cartItems}
                        navigate={navigate}
                        fetchAllProducts={fetchAllProducts}
                        fetchAllUserCartItems={fetchAllUserCartItems}
                        token={token}
                        products={products}
                    />}
                />
                <Route
                    path='/order'
                    element={<Order
                    navigate= {navigate}
                    />}
                    
                />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <React.Fragment>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </React.Fragment>
);