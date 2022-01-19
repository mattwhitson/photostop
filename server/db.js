const { Pool } = require("pg");

console.log(
  process.env.USER,
  process.env.PASSWORD,
  process.env.HOST,
  process.env.PORT,
  process.env.DB_NAME
);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: "postgres",
//   password: "Churchill1",
//   host: "localhost",
//   port: 5432,
//   database: "photostop",
// });

console.log(pool);

module.exports = pool;
