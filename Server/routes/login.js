const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require("../db.js");

router.post("/login", async (req, res) => {
  //accepting email and password
  const { email, password } = req.body;

  try {
    //find the user in DB
    const query_ = "SELECT email, password FROM user_table WHERE email=$1";

    const result = await pool.query(query_, [email]);

    //Using bcrypt.compare
    const user = result.rows[0]; // the first (and hopefully only) matching row
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid_password = await bcrypt.compare(password, user.password);
    console.log("password :",password);
    console.log("user password :",user.password);
    if (!valid_password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    //Sign JWT
    const token = jwt.sign({ useremail: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/login", (req, res) => {
  res.send("Here is your login page");
  console.log("You are at login page");
});

module.exports = router;
