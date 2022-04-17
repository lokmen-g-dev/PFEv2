
const express = require("express");
const mongoose = require("mongoose");
const bcrypt= require("bcryptjs")
const router = express.Router();
const jwt=require("jsonwebtoken");
const Operateur= require("../models/operateur_model")
const Joi = require("@hapi/joi");

const loginschema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

router.post("/login",async(req,res)=>{

    /////VALIDATE INCOMING ADMIN DATA
    const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
    if (error) return res.status(403).send(error.details[0].message);
  
  
    try{
      const operateur= await Operateur.findOne({email:req.body.email})
      if (!admin) return res.status(403).send("Account doesn't exists");
  
      bcrypt.compare(
        req.body.password,
        operateur.password
      );
      const access_token = jwt.sign(
        { operateur: operateur._id },
        process.env.ACCESS_TOKEN
      );
      res.send(access_token)
    } catch(err){
      res.json({message:err}) 
    }
  })
  router.delete("/delete/:id",async(req,res)=>{
    try{
        const deletedOperateur=await Operateur.findByIdAndDelete({_id:req.params.id});
        console.log(deletedOperateur);
        res.send("deleted");
    }catch(err){res.json({message:err})}
})

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
        router.delete("/delete/:id",async(req,res)=>{
            try{
                const deletedOperateur=await Operateur.findByIdAndDelete({_id:req.params.id});
                console.log(deletedOperateur);
                res.send("deleted");
            }catch(err){res.json({message:err})}
        
        })
        router.get("/get",async(req,res)=>{
            try{
                const operateur= await Operateur.find();
                res.send(operateur);
            }catch(err){res.json({message:err})}
        })
        
  

  module.exports=router;