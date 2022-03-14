const express = require("express");
const router = express.Router();
const Operateur = require("../models/operateur_model") 


router.post("/signin", async(req,res)=>{
    const operateur = await new Operateur({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        tel:req.body.tel,
    })
    try{
        const savedOperateur = await operateur.save();
        res.send(savedOperateur);
    }catch(err){
        res.send({message:err})
    }
});

router.get("/overview",async(req,res)=>{
    try{
        const operateur= await Operateur.find();
        res.send(operateur);
    }catch(err){res.json({message:err})}
})

module.exports=router;