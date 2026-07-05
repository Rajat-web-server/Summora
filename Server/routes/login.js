const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router =express.Router();
const pool = require("../db.js");

router.post('/login', async (req,res)=>{
    //accepting email and password
    const { email, password } = req.body;

    try{
        //find the user in DB
      const query_ =
      "SELECT email, password FROM user_table WHERE email=$1";  

      const result = await pool.query(query_,[userEmail]);

      //Using bcrypt.compare
      const comapare_password =  await bcrypt.compare(password, result.password)

      if(!comapare_password){
        return res.status(401).json({
            message:"Invalid email or password"
        })
      }
      //Sign JWT
      const token = jwt.sign(
        {email: email},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
      );
      res.status(200).json({ token });

    }catch(err){
        console.log("Error :", error);
      res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router;