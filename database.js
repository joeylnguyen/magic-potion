const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  host: process.env.PG_HOST || "postgres",
  user: process.env.PG_USER || "postgres",
  password: process.env.PASSWORD || "localhost",
  port: process.env.PORT || 5432,
  database: process.env.DATABASE || "magicpotion",
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = pool;
