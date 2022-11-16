import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { getAllProducts, getUser } from './api'; 

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
    SingleProductView
} from './components'

const App = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);

    const navigate = useNavigate();

    async function getMe() {
        const storedToken = window.localStorage.getItem('token')
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }

        const results = await getUser(token)
        if (results) {
            setUser(results);
            setUsername(results.username);
            setUserId(results.id)
        } else {
            console.log('error getting user results')
        }
    }

    function logout() {
        window.localStorage.removeItem('token');
        setToken('')
        setUser({});
    }

    async function fetchAllProducts() {
        const results = await getAllProducts();
        setProducts(results);
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token}/>
            <Routes>
                <Route 
                    path='/home'
                    element={<Home navigate={navigate} token={token} logout={logout}/>}
                />
                <Route 
                    path='/products'
                    element={<Products products={products} fetchAllProducts={fetchAllProducts}/>}
                />
                <Route 
                    path='/:title'
                />
                {/* useParams ^^ */}
                <Route 
                    path='/login'
                    element={<Login navigate={navigate} setToken={setToken}/>}
                />
                <Route 
                    path='/register'
                    element={<Register token={token} navigate={navigate} setToken={setToken}/>}
                />
                <Route 
                    path='/edit-product'
                />
                <Route 
                    path='/add-product'
                />
                <Route 
                    path='/edit-cart'
                />
                <Route 
                    path='/cart'
                />
                <Route 
                    path='/checkout'
                />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);