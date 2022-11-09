const { client } = require('./client');

async function addProductToCart() {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM products
            JOIN cart ON products
        `)
    } catch(ex) {

    }
}