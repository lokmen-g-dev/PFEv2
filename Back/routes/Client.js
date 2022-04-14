const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Ajouter = require("../models/incrire.js");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");

sgMail.setApiKey(process.env.API_KEY);
const verification = require("./admin_verification");
const  verif = require("../models/verif");
//////VALIDATION/////
const Joi = require("@hapi/joi");
const code = '19';
const nb_client = 0 ;

const InscrireSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/signin", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  const Client = new Ajouter({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    tel: req.body.tel,
    Number: req.body.Number,
    Etat:"__"
  });
 
 //inscrit client


  try {
    const savedclient = await Client.save();
    
    console.log(savedclient);
    // OTP
  
    const message = {
      to: savedclient.email,
      from:'tnu.devops@gmail.com',
      subject: "Email confirmation",
      templateId: 'd-6b1a2a8ca17c471286368441d48d0b28',
      dynamic_template_data:{
        name:savedclient.name,
        code:code
      }
    };
 
    sgMail
    .send(message)
    .then(() => {
      console.log('Email sent')
    })
    res.send(savedclient);
    } catch (err) {
    res.send({message:err})
    }
});

router.post("/verif",async(req,res)=>{
  const test = new verif({
    OTP: req.body.OTP,
  });
  try{
      
    const savedtest = await test.save();
    console.log(savedtest);
  }catch(err){res.json({message:err})} 
  
  if (OTP == code) {

    const message = {
      to: savedclient.email,
      from:'tnu.devops@gmail.com',
      subject: "Email confirmation",
      templateId: 'd-6b1a2a8ca17c471286368441d48d0b28',
      dynamic_template_data:{
        name:savedclient.name,
        code:code
      }
    };
 
    sgMail
    .send(message)
    .then(() => {
      console.log('Email sent')
    })
   
    
  }

});

    router.get("/list",async(req,res)=>{
    try{
        const Client= await Ajouter.find();
        var size = Object.keys(Client).length;
        console.log(size)
        res.send(Client);
    }catch(err){res.json({message:err})}
    })
    
 


module.exports = router;
