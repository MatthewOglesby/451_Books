const express = require('express');
const { getAllCarts } = require('../db/cart')

router.get('/', async (req, res) => {
    const users = await getAllCarts();

    res.send({
        cart
    });
});