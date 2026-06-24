const express= require ('express');
const router= express.Router();

router.get('/:id',(req,res)=>{
    const userID = req.params.id;
    res.send(`user ID:${userID}`)
})

module.exports=router;