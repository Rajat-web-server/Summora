const express= require ('express');
const router= express.Router();

try{
  router.post("/test",(req,res)=>{
    console.log(req.body);
    res.json({
        Message:"Data Received",
        data: req.body
    });
    console.log(req.body)
})  
}
catch(error){
    console.log("Error :",error)
}

module.exports=router;