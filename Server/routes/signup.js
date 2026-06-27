const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db.js");

router.post("/test", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body:",req.body);

    if (!password || !email) {
      return res.status(400).json({
        message: "Email and password not there",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword],
    );

    const newUser = result.rows[0];
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error :", error);
     res.status(500).json({ message: "Something went wrong" });
  }
});
console.log("hello");

router.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});

module.exports = router;

// res.status(201).json({
//   message: "User Created succesfully",
//   user: {
//     id: newUser.id,
//     email: newUser.email,
//   },
// });

//   console.log(req.body);
//   res.json({
//     Message: "Data Received",
//     data: req.body,
//   });
