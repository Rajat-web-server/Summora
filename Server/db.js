// require("dotenv").config();

// const { Pool } = require('pg');

// const pool = new Pool({
//    connectionString: process.env.DATABASE_URL,
// });
// pool.connect().then((client)=>{console.log("Connected")
//    client.release();
// })
//  .catch(err => {
//     console.error("Database connection failed:", err.message);
//     process.exit(1); // or handle gracefully
//   });

// module.exports = pool;

const { Pool } = require("pg");

const conn = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Query_123",
  database: "Summora_db",
});

conn.connect().then(() => console.log("The Database is connected"));

async function getDemo_table() {
  try {
    const res = await conn.query('SELECT * FROM "Demo_table"');
    console.log(res.rows);
  } catch (error){
    console.log(error.message);
  } finally {
    await conn.end();
  }
}

getDemo_table();