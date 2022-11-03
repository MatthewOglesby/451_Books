const express = require('express');


const apiRouter = express.Router();

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
