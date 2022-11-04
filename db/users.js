const { client } = require("./client");
const bcrypt = require('bcrypt')

async function createUser({ email, username, password }) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
      const {
        rows: [user],
      } = await client.query(
        `
        INSERT INTO users(email, username, password) 
        VALUES($1, $2, $3) 
        RETURNING *;
      `,
        [email, username, hashedPassword]
      );

      delete user.password;
      return user;

    } catch (error) {
      throw error;
    }
  }
  
  async function getUser({ username, password }) {

    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      try {
        const {
          rows: [user],
        } = await client.query(
          `
        SELECT id, username
        FROM users
        WHERE username=$2 AND password=$3;
        `,
          [username, hashedPassword]
        );
  
        return user;

      } catch (error) {
        throw error;
      }
    }
  }
  
  async function getUserById(userId) {
    
    try {
      const {
        rows: [user],
      } = await client.query(
        `
    SELECT id, username     
    FROM users
    WHERE id=${userId};
    `);

      return user;

    } catch (error) {
        throw error;
    }
  }
  
  async function getUserByUsername(userName) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
        [userName]
      );
  
      return user;
    } catch (error) {
        throw error;
    }
  }
  
  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
  }