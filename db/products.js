const { client } = require('./client');

async function getAllProducts(){
  try {
    const {rows} = await client.query(`
      SELECT * FROM products;
    `);
    console.log("line 8", rows)

    return rows;
  } catch (error) {
    throw (error);
  }
}

async function createProduct({title, description, author, pageCount, genre, price, image}) {

  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, author, pageCount, genre, price, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [title, description, author, pageCount, genre, price, image])
    
    return product;

  }
  catch(ex) {
    console.log('error in createProduct adapter function', ex)
  }
}

async function getProductById(id) {

  try {
    const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;
    `, [id])

    return product;
  }
  catch (err) {
    console.error("getRoutineById-routine.js FAILED:", err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById
}

// title, description, author, page-count, genre