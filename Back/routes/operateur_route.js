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
   
    try{
        
        const savedOperateur = await operateur.save();
        //Add operateur
        const message = {
            to: savedOperateur.email,
            from: 'tnu.devops@gmail.com' ,
            subject: "Email confirmation",
            templateId: 'd-901023562e654d85a7857102fd6ebe3e' ,
            dynamic_template_data:{
                email: savedOperateur.email,
                tel: savedOperateur.tel,
                name:savedOperateur.name,
                password:savedOperateur.password
            }
          
          };
              
              sgMail
              .send(message)
              .then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })

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
 //Delet operateur

    router.delete("/delete/:id",async(req,res)=>{
    try{
        const deletedOperateur=await Operateur.findByIdAndDelete({_id:req.params.id});
        console.log(deletedOperateur);
        res.send("deleted");
    }catch(err){res.json({message:err})}
})
module.exports=router;