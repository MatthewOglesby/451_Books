const { client } = require('./client')

const { createUser } = require("./users");
const { createProduct, getProductById, getProductByTitle, updateProduct, getAllProducts, deleteProduct } = require('./products')
const { addProductToCart, updateCart, getCartById, getAllCarts } = require('./cart');

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
    DROP TABLE IF EXISTS purchases;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)

    console.log('Finished Dropping Tables')
  }
  catch (ex) {
    console.log('error dropping tables', ex)
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL,
        author VARCHAR(255),
        pageCount VARCHAR(255),
        genre VARCHAR(255),
        price VARCHAR(255),
        image VARCHAR(255),
        quantity VARCHAR(255)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        order_quantity INTEGER,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        UNIQUE ("userId", "productId")
     );
    `);

    console.log('Finished Creating Tables');

  }
  catch (ex) {
    console.log('error creating tables', ex)
  }
};

async function createInitialProducts() {
  try {
    console.log('Creating Products')

    await createProduct({
      title:
        "Harry Potter and the Sorcerer's Stone",
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
        "https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg",
      quantity:
        "57"
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
        "https://media.harrypotterfanzone.com/chamber-of-secrets-ebook-cover-1050x0-c-default.jpg",
      quantity:
        "57"
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
        "https://m.media-amazon.com/images/I/318nujF5v5L._AC_SY780_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "The Lord of The Rings",
      description:
        "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them",
      author:
        "J.R.R Toklkien",
      pageCount:
        "535",
      genre:
        "Fiction",
      price:
        "$17.89",
      image:
        "https://m.media-amazon.com/images/I/51kfFS5-fnL._AC_SY780_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "I Will Find You: Solving Killer Cases from My Life Fighting Crime ",
      description:
        "Detective Lt. Joe Kenda, star of Homicide Hunter, shares his deepest, darkest, and never before revealed case files from his 19 years as a homicide detective",
      author:
        "Joe Kenda",
      pageCount:
        "288",
      genre:
        "Detective story",
      price:
        "$11.99",
      image:
        "https://m.media-amazon.com/images/I/51a5n1ueF1L._SX332_BO1,204,203,200_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "True Crime Stories You Won't Believe: Book Two ",
      description:
        "In this book, I present tales of true crime and bizarre applications of justice (or injustice, as the case may be)",
      author:
        "Romeo Vitelli",
      pageCount:
        "230",
      genre:
        "Biographies & Memoirs",
      price:
        "$10.89",
      image:
        "https://m.media-amazon.com/images/I/41VZPJHOlFL.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "Robin",
      description:
        "From New York Times culture reporter Dave Itzkoff comes the definitive audiobook biography of Robin Williams - a compelling portrait of one of America’s most beloved and misunderstood entertainers",
      author:
        "Dave ItzKoff",
      pageCount:
        "544",
      genre:
        "Entertainment",
      price:
        "$24.09",
      image:
        "https://m.media-amazon.com/images/I/51EIw7k-X1L.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "The Complete Zen Disc Golf",
      description:
        "Author and Disc Golfer, Patrick McCormick, takes the reader on journey of mental and psychological calibration using Disc Golf as a tool to help us find more effective ways of thinking on and off the course in his first two book",
      author:
        "Patrick D McCormick",
      pageCount:
        "230",
      genre:
        "Sports",
      price:
        "$14.76",
      image:
        "https://m.media-amazon.com/images/I/41r2RZ4JBgL._SX326_BO1,204,203,200_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "SpongeBob Goes to the Doctor",
      description:
        "Get Ready Books teach valuable life lessons with your favorite Nickelodeon characters—and they include over 30 stickers!",
      author:
        "Steven Banks",
      pageCount:
        "24",
      genre:
        "Childrens Books",
      price:
        "$5.75",
      image:
        "https://m.media-amazon.com/images/I/51HL8BEGiAL._SY498_BO1,204,203,200_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "JavaScript and jQuery: Interactive Front-End Web Development ",
      description:
        "A visual and accessible guide to JavaScript and jQuery in a built-to-last hardcover edition",
      author:
        "Patrick D McCormick",
      pageCount:
        "230",
      genre:
        "Educational",
      price:
        "$35.78",
      image:
        "https://m.media-amazon.com/images/I/4119l82gW1L._SX518_BO1,204,203,200_.jpg",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "Ready Player One",
      description:
        "Set in a dystopia in 2045, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which would lead him to inherit the game creator's fortune.",
      author:
        "Ernest Cline",
      pageCount:
        "374",
      genre:
        "Science Fiction and Fantasty",
      price:
        "$19.99",
      image:
        "https://images.penguinrandomhouse.com/cover/9780307887443",
      quantity:
        "57"
    });

    await createProduct({

      title:
        "Born a Crime",
      description:
        "Autobiography of Trevor Noah's upbringing in the slums of South Africa.",
      author:
        "Trevor Noah",
      pageCount:
        "304",
      genre:
        "Non-fiction",
      price:
        "$14.99",
      image:
        "https://m.media-amazon.com/images/I/5155UwVQ-LL._AC_SY780_.jpg",
      quantity:
        "57"
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
        'https://m.media-amazon.com/images/I/41-KHndhtVL._AC_SY780_.jpg',
      quantity:
        "57"
    });

    await createProduct({
      title:
        "Percy Jackson and The Olympians: The Lightning Thief",
      description:
        "Mythical creatures galore",
      author:
        "Rick Riordan",
      pageCount:
        "300",
      genre:
        "fantasy",
      price:
        "$20",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg",
      quantity:
        "57"
    });

    console.log('Finished creating Products')
  }
  catch (ex) {
    console.log('error creating Products', ex)
  }
}

// INTIAL BUILD OF DB BELOW //

async function createInitialCarts() {
  try {
    const cartsToCreate = ["cart"]

  } catch(ex) {
    console.log("error making initial carts")
  }
}

async function createInitialUsers() {

  console.log("Starting to create users...")

  try {
    const usersToCreate = [
      { email: 'matthew@email.com', username: "matthew", password: "password", isAdmin:true },
      { email: 'ross@email.com', username: "ross", password: "password", isAdmin:true  },
      { email: 'claire@email.com', username: "claire", password: "password", isAdmin:true  },
      { email: 'jaeln@email.com', username: "jaeln", password: "password", isAdmin:true  },
      { email: 'ethan@email.com', username: "ethan", password: "password", isAdmin:true  },
      { email: 'default1@email.com', username: "albert", password: "bertie99"},
      { email: 'default2@email.com', username: "sandra", password: "sandra123" },
      { email: 'default3@email.com', username: "glamgal", password: "glamgal123" }
    ]
    const users = await Promise.all(usersToCreate.map(async (user) => {
      const result = await createUser(user)
      // console.log(result)
      return result;
    }))

    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!", error)
    throw error
  }
}
async function testDB() {
  try {
    // console.log('testing getting product by id')
    // const result = await getProductById(9);
    // console.log(result);
    //
    // console.log('testing getting product by title')
    // const result = await getProductByTitle('SpongeBob Goes to the Doctor');
    // console.log(result);

    // const allProducts = await getAllProducts();
    // console.log('testing updating product')
    // const result = await updateProduct(allProducts[0].id, {
    //   title: "meh",
    //   description: 'eeee',
    // })
    // console.log(result);

    // console.log('testing deleting product')
    // const result = await deleteProduct(4)
    // console.log(await getAllProducts())

    // console.log('testing adding product to cart-----------')
    const result = await addProductToCart(2, 2, 10)
    const cart = await getCartById(1)
    console.log("cart test",cart)

    
    // return result;

   const allCarts = await getAllCarts()
   console.log("testing line 425",allCarts)
    // const cart = await getCartById(1)
const updateCart2 = await updateCart(allCarts[0].id,{
  order_quantity:9
  
})
 console.log("testing update cart",updateCart2)
//     console.log("cart test",cart)
// console.log(result)
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}


async function buildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCarts();
  }
  catch (ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end())
