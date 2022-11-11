const express = require("express");
const router = express.Router();
const {
  getUserByUsername,
  createUser,
  getAllUsers,
  getUserById,
  getUser,
} = require("../db/users");
const { getCartById } = require('../db/cart')
const { JWT_SECRET } = process.env;
const { requireUser } = require('./utils')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users
  });
});


router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("TESTING USERNAME LINE 30", username)
    if (!username || !password) {
      res.send({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
    const user = await getUserByUsername(username);
    console.log("TETSING USER______", user)
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password,hashedPassword)

    if (user && isValid) {
      const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET)

      res.send({ message: "you're logged in!", token });

    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});


router.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    const user = await createUser({
      email,
      username,
      password

    });

    if (_user) {
      res.send({
        error: 'error',
        name: 'UserExistsError',
        message: `A user by that ${username} already exists`
      });
    }

    const token = jwt.sign({
      id: user.id,
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({
      message: "you're signed up!", token, user
    });

  } catch ({ name, message }) {
    next({ name, message })
  }
});

router.get('/me', requireUser, async (req, res) => {
  try {
    const { id, username } = req.body;
    const users = await getUserById(id, username);
    console.log(users, "GETTING USERS HERE")
    res.send(users);
  } catch (error) {
    console.log(error)
  }
});

router.get('/users/:id/cart', async (req, res, next) => {
  const { id } = req.params; 

  try {
    const usersCart = await getCartById(id);
    res.send(usersCart)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;