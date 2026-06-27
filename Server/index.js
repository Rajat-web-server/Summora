require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const loginRoutes = require("./routes/auth.js");
const user = require("./routes/user.js");
const signup = require("./routes/signup.js");
const pool = require("./db.js");
const Cors = require("cors")

// app.use(cors());


app.use(express.json());
app.use("/api", signup);


app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      Time: new Date(result.rows[0].now).toLocaleString(),
    });
  } catch {
    console.log("Error");
    res.status(500).json({
      status: "Database connection failed",
    });
  }
});

app.get("/", (req, res) => {
  res.end("Hello world yoo");
});
app.use("/users", user);
app.use("/auth", loginRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log("Error : ", error);
}
