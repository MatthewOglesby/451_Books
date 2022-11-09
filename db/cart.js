const { client } = require('./client');
const { getProductById } = require('./products');

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

module.exports = {addProductToCart};