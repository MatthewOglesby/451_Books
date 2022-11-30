const express = require('express');
const productsRouter = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductByTitle,
  deleteProduct 
} = require('../db/products');
const { requireUser } = require('./utils');

productsRouter.get("/", async (req, res, next) => {
  console.log("ALL PRODUCTS YEAAHHHH!")
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  }catch(error) {
    console.log(error);
      next(error);
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

productsRouter.patch('/:productID', requireUser, async (req, res, next) => {
  const { productID } = req.params
  const { title, description, author, pageCount, genre, price, image, quantity } = req.body

  try {
    const product = await getProductById(productID);

    if (product) {
      const updatedProduct = await updateProduct(productID, {
        id: productID,
        title: title,
        description: description,
        author: author,
        pageCount: pageCount,
        genre: genre,
        price: price,
        image: image,
        quantity: quantity
      });

      res.send(updatedProduct)
    } else {
      res.send({
        error: 'ProductUpdateError',
        name: 'Error updating product',
        message: `This product was unable to be udpated`,
      })
    }
  } catch (error) {
    console.log('api error---', error);
    next(error);
  }
});

productsRouter.delete('/:productId', requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    if (product) {
      const deleteProducts = await deleteProduct(productId)
      res.send(deleteProducts)
    } else {
      res.status(403);
      next({
        name: "UnauthorizedUserError",
        message: `Cannot delete product`,
        error: " Error can't edit ",
      });
    }
  }
  catch (error) {
    next(error);
  }

})

module.exports = productsRouter;
