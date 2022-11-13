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
    const {productId,userId, order_quantity} = req.body;
    console.log("TESTING CREATE CART", order_quantity)
    try{
    console.log('TESTING ABOVE CART');    
    const cart = await addProductToCart( productId,userId,order_quantity );


    console.log("TESTING CART", cart);
    res.send(cart);

    }catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;