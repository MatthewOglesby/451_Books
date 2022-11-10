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





module.exports = router;