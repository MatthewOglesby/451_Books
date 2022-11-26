const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  addProductToCart,
  updateCart,
  getCartById,
  deleteCartItem,
} = require("../db/cart");

router.get("/", async (req, res) => {
  try {
    const cart = await getAllCarts();

    res.send({
      cart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { productId, userId } = req.body;

  try {
   
    const cart = await addProductToCart(productId, userId);

    res.send(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { order_quantity, productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await getCartById(id);

    if (cart) {
      const updatedCart = await updateCart(id, {
        order_quantity,
      });
      console.log(updatedCart);
      res.send(updatedCart);
    } else {
      res.send({
        error: "CartUpdateError",
        name: "Error updating cart",
        message: `This cart was unable to be udpated`,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // const {order_quantity, userId, productId} = req.body;

  try {
    const cart = await getCartById(id);

    if (cart) {
      const deleteCartItems = await deleteCartItem(id);
      res.send(deleteCartItems);
    } else {
      res.status(403);
      next({
        name: "UnauthorizedUserError",
        message: `Cannot delete cart item`,
        error: " Error can't edit ",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
