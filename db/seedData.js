const { client } = require('./client')

const { createUser } = require("./users");
const { createProduct, getAllProducts } = require('./products')

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
  catch (ex) {
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
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL,
        author VARCHAR(255),
        pageCount VARCHAR(255),
        genre VARCHAR(255),
        price VARCHAR(255),
        image VARCHAR(255)
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
  catch (ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "The book is about Harry Potter, who is invited to attend Hogwarts, school of witchcraft and wizardry. He then learns that a powerful wizard and his minions are after the sorcerer's stone that will make this evil wizard immortal and undefeatable.",
      description:
        "Sad story wizard.",
      author:
        "J.K. Rowling",
      pageCount:
        "298",
      genre:
        "fantasy",
      price:
        "$20",
      image:
        "https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg"
    });

    await createProduct({
      title:
        "Harry Potter and the Chamber of Secrets",
      description:
        "Big snake so scary",
      author:
        "J.K. Rowling",
      pageCount:
        "299",
      genre:
        "fantasy",
      price:
        "$20",
      image:
        "https://media.harrypotterfanzone.com/chamber-of-secrets-ebook-cover-1050x0-c-default.jpg"
    });

    await createProduct({
      title:
        "Twilight",
      description:
        "Love story so sweet nice",
      author:
        "Stephanie Meyer",
      pageCount:
        "498",
      genre:
        "Romance",
      price:
        "$19.99",
      image:
        "https://m.media-amazon.com/images/I/318nujF5v5L._AC_SY780_.jpg"
    });

    await createProduct({
      title:
        'Life 3.0',
      description:
        'How will AI affect crime, war, justice, jobs, society and our very sense of being human?',
      author:
        'Max Tegmark',
      pageCount:
        '384',
      genre:
        'Non-Fiction',
      price:
        '$15.99',
      image:
        'https://m.media-amazon.com/images/I/41-KHndhtVL._AC_SY780_.jpg'
    });




    await createProduct({
      title:
        "Percy Jackson and The Olympians: The Lightning Thief",
      description:
        "Mythical creatures galore",
      author:
        "Rick Riordan ",
      pageCount:
        "300",
      genre:
        "fantasy",
      price:
        "$20",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ucsandiegobookstore.com%2F00000045532&psig=AOvVaw3qdbYwbJ6wMDsmhcAslrPy&ust=1667742361911000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjOlMuWl_sCFQAAAAAdAAAAABAE"
    });



    console.log('Finished creating Products')
  }
  catch (ex) {
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
    const users = await Promise.all(usersToCreate.map(async (user) => {
      const result = await createUser(user)
      return result;
    }))

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
  catch (ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())
