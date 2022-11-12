const express = require('express');

const productsRouter = express.Router();

const { getAllProducts, getProductById, createProduct, updateProduct, getProductByTitle } = require('../db/products');
const { requireUser } = require('./utils');

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
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, description, author, pageCount, genre, price, image, quantity } = req.body

  try {
    const product = await createProduct({
      title, 
      description, 
      author, 
      pageCount, 
      genre, 
      price, 
      image, 
      quantity
    });
      res.send(product)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params
  const { title, description, author, pageCount, genre, price, image, quantity } = req.body
  const { ... fields } = req.body

  try {
    const product = await getProductById(productId);
    console.log("TESTING PRODUCT ID", productId)
    console.log("TESTING PRODUCTS",product)
    if (product) {
      const updatedProduct = await updateProduct(productId,{
        id: productId,
        title, 
        description, 
        author, 
        pageCount, 
        genre, 
        price, 
        image, 
        quantity
      });
      console.log("PAGE COUNT", pageCount)
      console.log("TESTNG PRODUCT ID LINE 71", productId)
      console.log("TESTING UPDATING PRODUCT", updatedProduct)
      res.send(updatedProduct)
    } else {
      res.send({
        error: 'ProductUpdateError',
        name: 'Error updating product',
        message: `This product was unable to be udpated`,
      })
    }
    // const existingProduct = await getProductByTitle(fields.name);
    // if (existingProduct) {
    //   res.send({
    //     error: 'ProductExistsError',
    //     name: 'Product name already exists',
    //     message: `A product with name ${fields.name} already exists`,
    //   })
    // }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productsRouter;
