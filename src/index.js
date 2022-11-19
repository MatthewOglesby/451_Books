import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { getAllProducts, getAllUsers, getUserDetails } from './api'; 

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
    const [isAdmin, setIsAdmin] = useState(false);

    // console.log('Testing User: ', user)
    // console.log('Testing all users: ', users)

    // console.log(products)

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
            setIsAdmin(results.isAdmin)
        } else {
            console.log('error getting user results in the getMe function')
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

    async function fetchAllUsers() {
        const results = await getAllUsers();
        console.log(results)
        setUsers(results);
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token}/>
            <Routes>
                <Route 
                    path='/'
                    element={<Home navigate={navigate} token={token} logout={logout} user={user}/>}
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
                    path='/all-users'
                    element={<AllUsers navigate={navigate} fetchAllUsers={fetchAllUsers} users={users} />}
                />
                <Route 
                    path='/login'
                    element={<Login navigate={navigate} setToken={setToken}/>}
                />
                <Route 
                    path='/register'
                    element={<Register token={token} navigate={navigate} setToken={setToken}/>}
                />
                <Route
                    path='/products/:productID'
                    element={<SingleProductView products={products} user={user}/>}
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