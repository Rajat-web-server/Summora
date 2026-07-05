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


    }catch{
        
    }
})