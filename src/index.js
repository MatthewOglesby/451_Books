import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';

import {
    
} from './components'

const App = () => {
    return (
        <div>
            
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