const { Client } = require('pg');

const { DATABASE_URL } = process.env || 'https://localhost:5432/graceshopper';

const client = new Client({
  connectionString: DATABASE_URL
})

module.exports = { client }
