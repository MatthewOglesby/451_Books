const { client } = require('./client');

async function getAllProducts() {
  try {
    console.log('DB PRODUCT ADAPTER')
    const { rows } = await client.query(`
    SELECT * FROM products;
    
    `);

    return rows;

  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE id = ${id}
    `);

    return product;

  } catch (error) {
    throw error;
  }
}

async function getProductByTitle(title) {
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE title = $1
    `, [title]);

    return product;

  } catch (error) {
    throw error;
  }
}

async function createProduct({ title, description, author, pageCount, genre, price, image, quantity }) {

  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products (title, description, author, "pageCount", genre, price, image, quantity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [title, description, author, pageCount, genre, price, image, quantity]);

    // console.log(product);

    return product;
  }
  catch (ex) {
    console.log('error in createProduct adapter function', ex)
    throw ex;
  }
}

async function updateProduct( id, fields = {}) {

  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    console.log("setstring: ", setString)

    if (setString.length > 0) {
      await client.query(
        `
         UPDATE products
         SET ${setString}
         WHERE id=${id}
         RETURNING *;
       `,
        Object.values(fields)
      );
      
      return await getProductById(id);

    }
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {

  try {
    const { 
      rows: [product] 
    } = await client.query(`
      DELETE FROM products 
      WHERE id = ${id}
      RETURNING *;
    `);

    return product;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  updateProduct,
  deleteProduct
}

// title, description, author, page-count, genre