const { client } = require('./');

async function createProduct({title, description}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description)
      VALUES ($1, $2)
      RETURNING *;
    `, [title, description])
    
    return product;
  }
  catch(ex) {
    console.log('error in creatPruduct adapter function')
  }
}


module.exports = {
  createProduct
}
