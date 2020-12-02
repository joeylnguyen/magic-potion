const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

module.exports = pool;
