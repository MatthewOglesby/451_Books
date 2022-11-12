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
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch ({ description, id, title, genre, price, author, image, quantity, pagecount }) {
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

productsRouter.patch('/:productId', requireUser, async (req, res, next) => {
  const { productId } = req.params
  const { title, description, author, pageCount, genre, price, image, quantity } = req.body
  const { ...fields } = req.body

  try {
    const product = await getProductById(productId);

    if (product) {
      const updatedProduct = await updateProduct(productId, {
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
