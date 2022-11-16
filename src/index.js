import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { getAllProducts } from './api'; 

import {
    Products,
    Navbar
} from './components'

const App = () => {
    const [products, setProducts] = useState([]);

    async function fetchAllProducts() {
        const results = await getAllProducts();
        setProducts(results);
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])

    return (
        <div>
            <Navbar />
            <Routes>
                <Route 
                    path='/products'
                    element={<Products products={products}/>}
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