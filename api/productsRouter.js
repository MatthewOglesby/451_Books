const express = require('express');

const productsRouter = express.Router();

const { getAllProducts, getProductById } = require('../db/products');

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch ({ description, id, title, genre, price, author, image, quantity, pagecount}) {
    next({ description, id, title, genre, price, author, image, quantity, pagecount });
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    console.log("GETTING PRODUCT HERE", product)
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = productsRouter;
