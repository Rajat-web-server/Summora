const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me",auth ,(req,res)=>{
    res.send("You are at Login page")
})

module.exports = router;