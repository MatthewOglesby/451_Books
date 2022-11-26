const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/graceshopper';

// postgres://db_451_books_db_l2v4_user:4RnPpbb109Y1FOxlSgVg67D2AxV2DTRe@dpg-cdumit5a49967v66o8ng-a.oregon-postgres.render.com/db_451_books_db_l2v4
// 'https://localhost:5432/graceshopper'
const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
})

module.exports = {client} 
