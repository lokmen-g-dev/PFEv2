const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const Ajouter = require("../models/Client");
const Joi = require("@hapi/joi");
const  verify = require("../routes/Verify");
const parseJwt = require("../routes/Decode")
sgMail.setApiKey(process.env.API_KEY);

//////VALIDATION/////
const  verif = require("../models/Code");


const code = Math.floor(Math.random() * 10052);
const Operateur = require("../models/operateur_model")

const InscrireSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/signin", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);
console.log(code)
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  const Client = new Ajouter({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    tel: req.body.tel,
    operateur: req.body.operateur,
    valide:false
  });
 


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
    console.log(savedclient.name);

    console.log(savedclient.operateur);
 
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

//test code OTP

router.post("/verif",async(req,res)=>{
  const test = new verif({
    OTP: req.body.OTP,
  });
  try{
         
    const savedtest = await test.save();
    console.log(savedtest);
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





   }catch(err){res.json({message:err})}
  
  

});


//login client




router.post("/login",async(req,res)=>{
  const loginschema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    
  });
    /////VALIDATE INCOMING ADMIN DATA
    const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
    if (error) return res.status(403).send(error.details[0].message);
  
  
    try{
      const Client= await Ajouter.findOne({email:req.body.email})
      if (!Client) return res.status(403).send("Account doesn't exists");
      console.log(Client)
      
      const validpassword = await bcrypt.compare(
        req.body.password,
        Client.password
      );
      
      if (!validpassword) return res.status(400).send("password is incorrect");
          const access_token = jwt.sign(
        { Client: Client._id },
        process.env.ACCESS_TOKEN
      );
        console.log(access_token)
      res.send(access_token)
      
    } catch(err){
      res.json({message:err}) 
    }
  })



    router.get("/list", verify ,async(req,res)=>{
      const token = req.header("Authorization");
console.log(typeof(token))
const operateur = parseJwt(token) 
console.log(typeof(operateur))
console.log(operateur)

      try{
        const Client= await Ajouter.find({operateur:operateur.Operateur});
        res.send(Client);
    }catch(err){res.json({message:err})}
    })


/// renvoyer
    
router.post("/renvoyer",async(res)=>{
  const test = new verif({
    email:Ajouter.email
  });
  try{
         
  
    console.log(test.email);
    

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
     
      
  





   }catch(err){res.json({message:err})}
  
  

});



/// ou blie pass
router.post("/forget", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);
console.log(code)
const emailcheck = await Operateur.findOne({
  email: req.body.email,
});
  //inscrit client

  try {
    const savedclient = await emailcheck.save();
     
     
  console.log(savedclient.email)
    const message = {
      to: savedclient.email,
      from:'tnu.devops@gmail.com',
      subject: "Emai confirmation",
      templateId: 'd-901023562e654d85a7857102fd6ebe3e',
      dynamic_template_data:{
        name:savedclient.name,
        code:code
      }
    };
    console.log(savedclient.name);

    
 
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



module.exports = router;
