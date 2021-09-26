"use strict";

// const { Pool } = require('pg');
const { DB } = require('../config');
const { Sequelize } = require('sequelize');
// const pgp = require('pg-promise')({
  // Initialization Options
// });

// Preparing the connection details:
// const cn = DB.DATABSE_URI;

// Creating a new database instance from the connection details:
// const db = pgp(cn);

// Exporting the database object for shared use:
// module.exports = db;


module.exports = new Sequelize(DB.DATABASE_URI);

// const pool = new Pool({
//   user: DB.PGUSER,
//   host: DB.PGHOST,
//   database: DB.PGDATABASE,
//   password: DB.PGPASSWORD,
//   port: DB.PGPORT
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params)
// }