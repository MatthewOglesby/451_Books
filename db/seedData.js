const { client } = require("./client");

const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
  getUserById,
} = require("./users");
const {
  createProduct,
  getProductById,
  getProductByTitle,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("./products");
const {
  addProductToCart,
  updateCart,
  getCartById,
  getAllCarts,
  deleteCartItem,
  getCartByUser,
} = require("./cart");

async function dropTables() {
  try {
    console.log("Dropping Tables");
    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);

    console.log("Finished Dropping Tables");
  } catch (ex) {
    console.log("error dropping tables", ex);
    throw ex;
  }
}

async function createTables() {
  try {
    console.log("Creating Tables");

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL,
        author VARCHAR(255),
        "pageCount" VARCHAR(255),
        genre VARCHAR(255),
        price FLOAT,
        image VARCHAR(255),
        quantity INTEGER
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
        "isActive" BOOLEAN  DEFAULT false,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        UNIQUE ("userId", "productId")
     );
     CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      item_quantity INTEGER,
      "cartId" INTEGER REFERENCES cart( id ),
      "customerId" INTEGER REFERENCES users( id ),
      UNIQUE ("cartId", "customerId")
   );
   
    `);

    console.log("Finished Creating Tables");
  } catch (ex) {
    console.log("error creating tables", ex);
    throw ex;
  }
}
//--INTIAL SEED DATA--
async function createInitialProducts() {
  try {
    console.log("Creating Products");

    await createProduct({
      title: "Harry Potter and the Sorcerer's Stone",
      description: "Harry Potter is a boy who learns on his eleventh birthday that he is the son of two powerful wizards. He is summoned to become a student at Hogwarts. There he meets several friends who help him discover the truth about his parents’ mysterious deaths",
      author: "J.K. Rowling",
      pageCount: "298",
      genre: "Fiction",
      price: 20,
      image:
        "https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg",
        quantity: 57,
      });

      await createProduct({
        title: "Harry Potter and the Chamber of Secrets",
        description: "A mysterious elf tells Harry to expect trouble during his second year at Hogwarts, but nothing can prepare him for trees that fight back, flying cars, spiders that talk and deadly warnings written in blood on the walls of the school.",
        author: "J.K. Rowling",
        pageCount: "299",
        genre: "Fiction",
        price: 20,
        image:
        "https://media.harrypotterfanzone.com/chamber-of-secrets-ebook-cover-1050x0-c-default.jpg",
        quantity: 57,
      });
      
      await createProduct({
        title: "The Inheritance Games",
        description: "Avery Grambs has a plan for a better future: survive high school, win a scholarship, and get out. But her fortunes change in an instant when billionaire Tobias Hawthorne dies and leaves Avery virtually his entire fortune. The catch? Avery has no idea why — or even who Tobias Hawthorne is.",
        author: "Jennifer Lynn Barnes",
        pageCount: "400",
        genre: "Fiction",
        price: 8.95,
        image:
          "https://m.media-amazon.com/images/I/51Gv-CkrYOL._AC_SY780_.jpg",
        quantity: 49,
      });

    await createProduct({
      title: "Twilight",
      description: "Bella Swan doesn't expect life to change much when she moves from Arizona to Washington. She meets Edward Cullen, a handsome but mysterious teen with piercing eyes, he is a vampire who does not drink blood. They enter into a dangerous romance.",
      author: "Stephanie Meyer",
      pageCount: "498",
      genre: "Fiction",
      price: 19.99,
      image: "https://m.media-amazon.com/images/I/318nujF5v5L._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "The Lord of The Rings",
      description:
        "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them",
      author: "J.R.R Toklkien",
      pageCount: "535",
      genre: "Fiction",
      price: 17.89,
      image: "https://m.media-amazon.com/images/I/51kfFS5-fnL._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title:
        "I Will Find You: Solving Killer Cases from My Life Fighting Crime ",
      description:
        "Detective Lt. Joe Kenda, star of Homicide Hunter, shares his deepest, darkest, and never before revealed case files from his 19 years as a homicide detective",
      author: "Joe Kenda",
      pageCount: "288",
      genre: "Non-Fiction",
      price: 11.99,
      image:
        "https://m.media-amazon.com/images/I/51a5n1ueF1L._SX332_BO1,204,203,200_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "True Crime Stories You Won't Believe: Book Two ",
      description:
        "In this book, I present tales of true crime and bizarre applications of justice (or injustice, as the case may be)",
      author: "Romeo Vitelli",
      pageCount: "230",
      genre: "Non-Fiction",
      price: 10.89,
      image: "https://m.media-amazon.com/images/I/41VZPJHOlFL.jpg",
      quantity: 55,
    });

    await createProduct({
      title: "Robin",
      description:
        "From New York Times culture reporter Dave Itzkoff comes the definitive audiobook biography of Robin Williams - a compelling portrait of one of America's most beloved and misunderstood entertainers",
      author: "Dave ItzKoff",
      pageCount: "544",
      genre: "Non-Fiction",
      price: 24.09,
      image: "https://m.media-amazon.com/images/I/51EIw7k-X1L.jpg",
      quantity: 50,
    });

    await createProduct({
      title: "The Complete Zen Disc Golf",
      description:
        "Author and Disc Golfer, Patrick McCormick, takes the reader on journey of mental and psychological calibration using Disc Golf as a tool to help us find more effective ways of thinking on and off the course in his first two book",
      author: "Patrick D McCormick",
      pageCount: "230",
      genre: "Non-Fiction",
      price: 14.76,
      image:
        "https://m.media-amazon.com/images/I/41r2RZ4JBgL._SX326_BO1,204,203,200_.jpg",
      quantity: 57,
    });

    await createProduct({
      title: "SpongeBob Goes to the Doctor",
      description:
        "Get Ready Books teach valuable life lessons with your favorite Nickelodeon characters—and they include over 30 stickers!",
      author: "Steven Banks",
      pageCount: "24",
      genre: "Kids",
      price: 5.75,
      image:
        "https://m.media-amazon.com/images/I/51HL8BEGiAL._SY498_BO1,204,203,200_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "JavaScript and jQuery: Interactive Front-End Web Development ",
      description:
        "A visual and accessible guide to JavaScript and jQuery in a built-to-last hardcover edition",
      author: "Patrick D McCormick",
      pageCount: "230",
      genre: "Educational",
      price: 35.78,
      image:
        "https://m.media-amazon.com/images/I/4119l82gW1L._SX518_BO1,204,203,200_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "Ready Player One",
      description:
        "Set in a dystopia in 2045, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which would lead him to inherit the game creator's fortune.",
      author: "Ernest Cline",
      pageCount: "374",
      genre: "Fiction",
      price: 19.99,
      image: "https://images.penguinrandomhouse.com/cover/9780307887443",
      quantity: 56,
    });

    await createProduct({
      title: "Born a Crime",
      description:
        "Autobiography of Trevor Noah's upbringing in the slums of South Africa and how he became one of South Africa's most notable names in recent years.",
      author: "Trevor Noah",
      pageCount: "304",
      genre: "Non-Fiction",
      price: 14.99,
      image: "https://m.media-amazon.com/images/I/5155UwVQ-LL._AC_SY780_.jpg",
      quantity: 55,
    });

    await createProduct({
      title: "Life 3.0",
      description:
        "How will AI affect crime, war, justice, jobs, society and our very sense of being human?",
      author: "Max Tegmark",
      pageCount: "384",
      genre: "Non-Fiction",
      price: 15.98,
      image: "https://m.media-amazon.com/images/I/41-KHndhtVL._AC_SY780_.jpg",
      quantity: 57,
    });

    await createProduct({
      title: "Percy Jackson and The Olympians: The Lightning Thief",
      description: "Percy Jackson is about to be kicked out of boarding school... again. Lately, monsters and the gods of Mount Olympus seem to be walking straight out of Percy's Greek mythology textbook and into his life. And worse, he's angered a few of them.",
      author: "Rick Riordan",
      pageCount: "300",
      genre: "Fiction",
      price: 20,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "Bone #1: Out from Boneville",
      description: "After being run out of Boneville, the three Bone cousins -- Fone Bone, Phoney Bone, and Smiley Bone -- are separated and lost in a vast, uncharted desert. One by one, they find their way into a deep, forested valley filled with wonderful and terrifying creatures.",
      author: "Jeff Smith",
      pageCount: "144",
      genre: "Graphic Novel",
      price: 12.99,
      image:
        "https://m.media-amazon.com/images/I/51Zhztg+yeL._AC_SY780_.jpg",
      quantity: 66,
    });

    await createProduct({
      title: "Bone #2: The Great Cow Race",
      description: "Fone Bone and his cousins plan to return home after visiting the village of Barrelhaven with Thorn and Gran'ma Ben. But Phoney Bone risks everything on one last get-rich-quick scheme for the town's annual Great Cow Race.",
      author: "Jeff Smith",
      pageCount: "144",
      genre: "Graphic Novel",
      price: 11.99,
      image:
        "https://m.media-amazon.com/images/I/51sIbWKic0L._AC_SY780_.jpg",
      quantity: 64,
    });

    await createProduct({
      title: "Teenage Mutant Ninja Turtles: The Last Ronin",
      description: "What terrible events destroyed his family and left New York a crumbling, post-apocalyptic nightmare? All will be revealed in this climactic Turtle tale that sees longtime friends becoming enemies and new allies emerging in the most unexpected places. Can the surviving Turtle triumph?",
      author: "Kevin Eastman, Peter Laird, Tom Waltz, Robert Rodriguez (Introduction)",
      pageCount: "224",
      genre: "Graphic Novel",
      price: 24.99,
      image:
        "https://m.media-amazon.com/images/I/519isozjeCL._AC_SY780_.jpg",
      quantity: 55,
    });

    await createProduct({
      title: "Squire",
      description: "Aiza has always dreamt of becoming a Knight. It's the highest military honor in the once-great Bayt-Sajji Empire, and as a member of the subjugated Ornu people, Knighthood is her only path to full citizenship. Ravaged by famine and mounting tensions, Bayt-Sajji finds itself on the brink of war once again, so Aiza can finally enlist in the competitive Squire training program.",
      author: "Nadia Shammas, Sara Alfageeh (Illustrator)",
      pageCount: "336",
      genre: "Graphic Novel",
      price: 12.99,
      image:
        "https://m.media-amazon.com/images/I/41HAT1rOkdL._AC_SY780_.jpg",
      quantity: 50,
    });

    await createProduct({
      title: "Watchmen",
      description: "Considered the greatest graphic novel in the history of the medium, the Hugo Award-winning story chronicles the fall from grace of a group of superheroes plagued by all-too-human failings. Along the way, the concept of the superhero is dissected as an unknown assassin stalks the erstwhile heroes.",
      author: "Alan Moore, Dave Gibbons (Illustrator)",
      pageCount: "448",
      genre: "Graphic Novel",
      price: 19.99,
      image:
        "https://m.media-amazon.com/images/I/41chVzBhJiL._AC_SY780_.jpg",
      quantity: 65,
    });

    await createProduct({
      title: "The Umbrella Academy, Volume 1: Apocalypse Suite",
      description: "In an inexplicable worldwide event, forty-three extraordinary children were spontaneously born to women who'd previously shown no signs of pregnancy. Millionaire inventor Reginald Hargreeves adopted seven of the children; when asked why, his only explanation was, to save the world.",
      author: "Gerard Way, Various (Illustrator)",
      pageCount: "184",
      genre: "Graphic Novel",
      price: 15.99,
      image:
        "https://m.media-amazon.com/images/I/61m7Jsvu1sL.jpg",
      quantity: 45,
    });

    await createProduct({
      title: "Lyle, Lyle, Crocodile",
      description: "Everyone in the neighborhood loves Lyle the crocodile—except for a cranky neighbor and his nervous cat! Can lovable Lyle make everything right with his grumpy neighbors?",
      author: "Bernard Waber",
      pageCount: "48",
      genre: "Kids",
      price: 7,
      image:
        "https://upload.wikimedia.org/wikipedia/en/3/3c/Lyle_crocodile.gif",
      quantity: 50,
    });

    await createProduct({
      title: "Harold Loves His Woolly Hat",
      description: "What makes a bear special? For Harold, it is his beloved striped woolly hat. He wears it when he sleeps and when he goes to school, but when a crow whisks the hat off his head and high up into a nest, Harold doesn't feel so special anymore. This heartwarming picture book featuring an irresistible bear reinforces the notion that it doesn't matter what you have, it's who you are that matters.",
      author: "Vern Kousky",
      pageCount: "40",
      genre: "Kids",
      price: 13.99,
      image:
        "https://m.media-amazon.com/images/I/51jngGIKt7L._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "Don't Eat Bees: Life Lessons from Chip the Dog",
      description: "Are you a dog in need of advice? Fear not: Chip the dog is ON IT in this super-silly guide to living your best canine life. Chip is seven; he knows things. Like what to eat (important papers, the fancy bird the humans cooked for the fancy dinner, Grandpa's teeth), and what not to eat (bees).",
      author: "Dev Petty, Mike Boldt (Illustrator)",
      pageCount: "32",
      genre: "Kids",
      price: 32,
      image:
        "https://m.media-amazon.com/images/I/517gTBygcoL._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "Where the Sidewalk Ends: Poems and Drawings",
      description: "Here you'll meet a boy who turns into a TV set, and a girl who eats a whale. The Unicorn and the Bloath live there, and so does Sarah Cynthia Sylvia Stout who will not take the garbage out. Shel Silverstein's masterful collection of poems and drawings stretches the bounds of imagination and will be cherished by readers of all ages.",
      author: "Shel Silverstein",
      pageCount: "192",
      genre: "Kids",
      price: 15.99,
      image:
        "https://m.media-amazon.com/images/I/51ZnpIZcanL._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "The Giving Tree",
      description: "A story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein. This moving parable for all ages offers a touching interpretation of the gift of giving and a serene acceptance of another's capacity to love in return.",
      author: "Shel Silverstein",
      pageCount: "64",
      genre: "Kids",
      price: 11,
      image:
        "https://m.media-amazon.com/images/I/41ak9Ds2dWL._AC_SY780_.jpg",
      quantity: 60,
    });

    await createProduct({
      title: "The Official Guide to the GRE General Test, Third Edition",
      description: "If you're looking for the best, most authoritative guide to the GRE General Test, you've found it! The Official Guide to the GRE General Test, Third Edition is the only GRE guide specially created by ETS—the people who actually make the test.",
      author: "Educational Testing Service",
      pageCount: "608",
      genre: "Educational",
      price: 35.99,
      image:
        "http://prodimage.images-bn.com/pimages/9781259862410_p0_v14_s1200x630.jpg",
      quantity: 62,
    });

    await createProduct({
      title: "Anatomy & Physiology For Dummies",
      description: "Anatomy & Physiology For Dummies combines anatomical terminology and function so you'll learn not only names and terms but also gain an understanding of how the human body works. Whether you're a student, an aspiring medical, healthcare or fitness professional, or just someone who's curious about the human body and how it works.",
      author: "Erin Odya, Maggie A. Norris",
      pageCount: "384",
      genre: "Educational",
      price: 22.49,
      image:
        "https://m.media-amazon.com/images/I/51XRu8l2dfS._AC_SY780_.jpg",
      quantity: 61,
    });

    await createProduct({
      title: "R for Data Analysis in easy steps - R Programming essentials",
      description: "The R language is widely used by statisticians for data analysis, and the popularity of R programming has therefore increased substantially in recent years. The emerging Internet of Things (IoT) gathers increasing amounts of data that can be analyzed to gain useful insights into trends.",
      author: "Mike McGrath",
      pageCount: "192",
      genre: "Educational",
      price: 15.99,
      image:
        "https://m.media-amazon.com/images/I/51tl+JJyOuL._AC_SY780_.jpg",
      quantity: 58,
    });

    await createProduct({
      title: "Practical SQL: A Beginner's Guide to Storytelling with Data",
      description: "Practical SQL is an approachable and fast-paced guide to SQL (Structured Query Language), the standard programming language for defining, organizing, and exploring data in relational databases. The book focuses on using SQL to find the story your data tells, with the popular open-source database PostgreSQL and the pgAdmin interface as its primary tools.",
      author: "Anthony DeBarros",
      pageCount: "392",
      genre: "Educational",
      price: 39.95,
      image:
        "https://m.media-amazon.com/images/I/51ta4791GeL._AC_SY780_.jpg",
      quantity: 59,
    });

    console.log("Finished creating Products");
  } catch (ex) {
    console.log("error creating Products", ex);
    throw ex;
  }
}

// INTIAL BUILD OF DB BELOW //

async function createInitialCarts() {
  try {
    const cartsToCreate = ["cart"];
  } catch (ex) {
    console.log("error making initial carts");
    throw ex;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");

  try {
    const usersToCreate = [
      {
        email: "matthew@email.com",
        username: "matthew",
        password: "password",
        isAdmin: true,
      },
      {
        email: "ross@email.com",
        username: "ross",
        password: "password",
        isAdmin: true,
      },
      {
        email: "claire@email.com",
        username: "claire",
        password: "password",
        isAdmin: true,
      },
      {
        email: "jaeln@email.com",
        username: "jaeln",
        password: "password",
        isAdmin: true,
      },
      {
        email: "ethan@email.com",
        username: "ethan",
        password: "password",
        isAdmin: true,
      },
      {
        email: "admin@email.com",
        username: "admin",
        password: "administrator123",
        isAdmin: true,
      },
      { email: "default1@email.com", username: "albert", password: "bertie99" },
      {
        email: "default2@email.com",
        username: "sandra",
        password: "sandra123",
      },
      {
        email: "default3@email.com",
        username: "glamgal",
        password: "glamgal123",
      },
    ];
    const users = await Promise.all(
      usersToCreate.map(async (user) => {
        const result = await createUser(user);
        // console.log(result)
        return result;
      })
    );

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!", error);
    throw error;
  }
}

//--START TESTING DB--
async function testDB() {
  try {
    //--TESTING GET ALL USER--
    //  const result = await getAllUsers()
    //  console.log("TESTING GET ALL USERS LINE 402",result)

    //--TESTING GET USER BY USERNAME--
    //  const result = await getUserByUsername('ross')
    //  console.log("TESTING GET USER BY USER NAME DB", result)

    // --TESTING GET USER----------
    // const result = await getUser("matthew", "password")
    // console.log("line 414", result)

    // --TESTING GET USER BY ID-----------
    // const result = await getUserById(1)
    // console.log(result)

    //--TESING GET PRODUCT BY ID---------
    // console.log('testing getting product by id')
    // const result = await getProductById(9);
    // console.log(result);

    //--TESING GET PRODUCT BY TITLE--------
    // console.log('testing getting product by title')
    // const result = await getProductByTitle('SpongeBob Goes to the Doctor');
    // console.log(result);

    //--TESTING UPDATE PRODUCTS----------
    // const allProducts = await getAllProducts();
    // console.log('testing updating product')
    // const result = await updateProduct(allProducts[0].id, {
    //   title: "meh",
    //   description: 'eeee',
    // })
    // console.log(result);

    //--TESTING DELETE PRODUCTS-------------
    // console.log('testing deleting product')
    // const result = await deleteProduct(4)
    // console.log(await getAllProducts())

    //--TESTING ADD PRODUCT TO CART--------------
    // console.log('testing adding product to cart-----------')
    const addProduct1 = await addProductToCart(2, 2, 2);
    const addProduct2 = await addProductToCart(3, 4, 1);
    const addProduct3 = await addProductToCart(3, 2, 2);

    //--TESTING GETTING CART BY USER---------------
    // console.log("testing getting cart by userId-----------");
    // const usersCart = await getCartByUser(2);
    // console.log(usersCart);

    //--TESTING UPDATE CART-----------------
    //    const allCarts = await getAllCarts()
    //    console.log("testing line 425",allCarts)
    //     // const cart = await getCartById(1)
    // const updateCart1 = await updateCart(allCarts[0].id,{
    //   order_quantity:9,
    //   productId: 7
    // })
    //  console.log("testing update cart",updateCart1)
    //  const updateCart2 = await updateCart(allCarts[1].id,{
    //   order_quantity:11,
    //   productId: 5
    // })
    // console.log("testing update cart",updateCart2)

    //--TESTING DELETE CART ITEM-----------------
    // console.log('testing deleting cart')
    //  const result1 = await deleteCartItem(1)
    //      const result2 = await deleteCart(2)
    //  console.log(await getAllCarts())
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
  } catch (ex) {
    console.log("Error building the DB");
    throw ex;
  }
}

buildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
