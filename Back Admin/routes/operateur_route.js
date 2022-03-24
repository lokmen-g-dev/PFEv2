const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Operateur = require("../models/operateur_model") ;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.Email_key);


router.delete("/delete",)

router.post("/signin", async(req,res)=>{
const emailcheck = await Operateur.findOne({
        email:req.body.email
        })
      
    
    if (emailcheck) return res.status(400).send("Email already exists");

        const operateur = await new Operateur({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        tel:req.body.tel,
    })
    const link = 'www.localhost:3001'
    
    try{
        
        const savedOperateur = await operateur.save();
        
        const message = {
            to: savedOperateur.email,
            from: 'tnu.devops@gmail.com' ,
            subject: "Email confirmation",
            text: `Dear ${savedOperateur.name}
             this your account mail: ${savedOperateur.email},
             And this your password ${savedOperateur.password} ,
             You can connect in this link ${link}`,
           
          
          };
              
              sgMail.send(message);

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


router.delete("/delete/:id",async(req,res)=>{
    try{
        const deletedOperateur=await Operateur.findByIdAndDelete({_id:req.params.id});
        console.log(deletedOperateur);
        res.send("deleted");
    }catch(err){res.json({message:err})}
})
module.exports=router;