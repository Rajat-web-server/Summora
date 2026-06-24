require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const loginRoutes=require('./routes/auth.js')
const user=require('./routes/user.js')
require("./db");

app.get("/", (req, res) => {
  res.end("Hello world yoo");
});
app.use("/users",user)
app.use("/auth", loginRoutes)
app.get("/health", (req, res) => {
  res.end("Status: OK");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
