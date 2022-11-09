const express = require("express");
const router = express.Router();
const {
  getUserByUsername,
  createUser,
  getAllUsers,
} = require("../db/users");
const { JWT_SECRET } = process.env;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    });
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password , email} = req.body;

  // request must have both
  if (!username || !password || !email) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username, password and email",
    });
  }

  async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
  }

  try {
    const user = await getUserByUsername(username);
    if (user && comparePassword(password, "10")) {
      const id = user.id;
      // create token & return to user
      const token = jwt.sign(
        { id: id, username: username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.send({
        error: "Error",
        message: `User ${username} is already taken.`,
        name: "UserExistsError",
      });
    } else {
      console.log("new user");
    }

    if (password.length < 8) {
      res.send({
        error: "Password must be atleast 8 characters",
        message: "Password Too Short!",
        name: "Error",
      });
    }

    const user = await createUser({
      username,
      password,
      email,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});




module.exports = router;