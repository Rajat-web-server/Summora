require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const loginRoutes=require('./routes/auth.js')
const user=require('./routes/user.js');
const { Pool } = require("pg");
require("./db");

app.get("/", (req, res) => {
  res.end("Hello world yoo");
});
app.use("/users",user)
app.use("/auth", loginRoutes)
app.get("/health", async (req, res) => {
  try{
    const result = await Pool.query('SELECT NOW');
    res.json({
      status:"OK",
      Time:result.rows[0].now
    });
  }
  catch{
    console.log("Error")
    res.status(500).json({
      status:'Database connection failed',
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
