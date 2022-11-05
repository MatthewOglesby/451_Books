const { client } = require('./client');

async function getAllProducts(){
  try {
    const {rows} = await client.query(`
      SELECT * FROM products;
    `);
   
    return rows;

  } catch (error) {
    throw ('error getting all products', error);
  }
}

async function getProductById(id){
  console.log(id)
  try {
    const {rows: [product]} = await client.query(`
      SELECT * FROM products
      WHERE id = $1;
    `, [id]);
  
    return product;

  } catch (error) {
    throw ('error in getting product by id', error);
  }
}

async function createProduct({title, description, author, pageCount, genre, price, image, quantity}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, author, pageCount, genre, price, image, quantity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [title, description, author, pageCount, genre, price, image, quantity]);

    // console.log(product);

    return product;
  }
  catch(ex) {
    console.log('error in createProduct adapter function', ex)
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById
}

// title, description, author, page-count, genre