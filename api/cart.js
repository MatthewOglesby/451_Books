const express = require('express');
const router = express.Router();
const { getAllCarts, addProductToCart, updateCart, deleteCartItem } = require('../db/cart')

router.get('/', async (req, res) => {
    try {
    const cart = await getAllCarts();

    res.send({
        cart
    });
    }catch({order_quantity, productId}) {
        next({order_quantity, productId});
    }
});

router.post('/', async (req, res, next) => {
    const { order_quantity, productId} = req.body;
    try{
    console.log('TESTING ABOVE CART');    
    const cart = await addProductToCart({ order_quantity,  productId });


    console.log("TESTING CART", cart);
    res.send(cart);

    }catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;