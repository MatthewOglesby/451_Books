const { client } = require('./client');
const { getProductById } = require('./products');

async function getAllCarts() {
    try {
      const { rows } = await client.query(`
        SELECT * FROM cart;
      `);
  
      return rows;
  
    } catch (error) {
      throw ('error getting all cart', error);
    }
  }

async function addProductToCart(
    productId,
    userId,
    quantity
) {
    const product = await getProductById(productId);
    console.log(product)
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart ("productId", "userId", order_quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [productId, userId, quantity])

        return cart;
    } catch(ex) {
        console.log("error adding product to cart")
        throw ex;
    }
}
async function getCartById(id) {
    try {
      const { rows: [cart] } = await client.query(`
        SELECT * FROM cart
        WHERE id = ${id}
      `);
  
      return cart;
  
    } catch (error) {
      throw (error);
    }
  }

async function updateCart( id, fields = {}) {

    try {
      const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");
  
      console.log("setstring: ", setString)
  
      if (setString.length > 0) {
        await client.query(
          `
           UPDATE cart
           SET ${setString}
           WHERE id=${id}
           RETURNING *;
         `,
          Object.values(fields)
        );
        
        return await getCartById(id);
  
      }
    } catch (error) {
      throw (error);
    }
  }

  async function deleteCartItem(id) {

    try {
      const { 
        rows: [carts] 
      } = await client.query(`
        DELETE FROM cart
        WHERE id = ${id}
        RETURNING *;
      `);
  
      return carts;
  
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    addProductToCart,
    getCartById,
    updateCart,
    getAllCarts,
    deleteCartItem
};