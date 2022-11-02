const express = require('express');

const productsRouter = express.Router();

productsRouter.get('/', (req, res, next) => {
  res.send('LIST OF PRODUCTS')
})

module.exports = productsRouter;
