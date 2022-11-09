const express = require('express');

const productsRouter = express.Router();

const { getAllProducts } = require('../db/products');
productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch ({ description, id, title, genre, price, author, image, quantity,pagecount}) {
    next({ description, id, title, genre, price, author, image, quantity, pagecount });
  }
});


module.exports = productsRouter;
