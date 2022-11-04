const { client } = require('./client')

const { createUser } = require("./users");
const { createProduct } = require('./products')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)
    
    console.log('Finished Dropping Tables')
  } 
  catch(ex) {
    console.log('error dropping tables')
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `)
    
    console.log('Finished Creating Tables')
  } 
  catch(ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "The first most amazing product",
      description:
        "Description for the first most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever...."
    });
    
    console.log('Finished creating Products')
  } 
  catch(ex) {
    console.log('error creating Products')
  }
}

// INTIAL BUILD OF DB BELOW //

async function createInitialUsers() {

  console.log("Starting to create users...")

  try {
    const usersToCreate = [
      { email: 'matthew@email.com', username: "matthew", password: "password" },
      { email: 'ross@email.com', username: "ross", password: "password" },
      { email: 'claire@email.com', username: "claire", password: "password" },
      { email: 'jaeln@email.com', username: "jaeln", password: "password" },
      { email: 'ethan@email.com', username: "ethan", password: "password" },
      { email: 'default1@email.com', username: "albert", password: "bertie99" },
      { email: 'default2@email.com', username: "sandra", password: "sandra123" },
      { email: 'default3@email.com', username: "glamgal", password: "glamgal123" }
    ]
    const users = await Promise.all(usersToCreate.map( async (user) => {
      const result = await createUser(user)
      return result;
    }))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!", error)
    throw error
  }
}

async function buildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
  }
  catch(ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())
