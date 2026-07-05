const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db.js");

router.post("/test", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("body:", req.body);

    if (!password || !email) {
      return res.status(400).json({
        message: "Email and password not there",
      });
    }
 

    
    const hashedPassword = await bcrypt.hash(password, 12);
    const query_ =
      "INSERT INTO user_table (email, password) VALUES ($1, $2) RETURNING email, password";

    const result = await pool.query(query_, [email, hashedPassword]);

    const newUser = result.rows[0];
    res.status(201).json({
      message: "User created successfully",
      user: {
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      console.log("Error :", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});
router.get("/test", async (req, res) => {
  res.json({ message: "Server is working!" });
});

module.exports = router;

