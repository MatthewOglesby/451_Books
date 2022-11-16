const express = require('express');
const {  getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const apiRouter = express.Router();

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);
const cartsRouter = require('./cart');
apiRouter.use('/carts', cartsRouter);

//-----HEALTH CHECK-------
apiRouter.get('/health', async (req, res, next) => {
    res.status(200).json({
        uptime: process.uptime(),
        message: 'All is well',
        timestamp: Date.now()
    });
    next()
});

apiRouter.use((error, req, res, next) => {
    res.send({
      error: error.error,
      name: error.name,
      message: error.message
    });
  });

module.exports = apiRouter;
