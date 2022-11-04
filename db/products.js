const { client } = require('./client');

async function getAllProducts(){
  try {
    const {rows} = await client.query(`
      SELECT * FROM products;
    `);
   

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
    console.log(product)
    return product;

  }
  catch(ex) {
    console.log('error in createProduct adapter function', ex)
  }
}


module.exports = {
  createProduct,
  getAllProducts
}

// title, description, author, page-count, genre