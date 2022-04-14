const express = require("express");
const bcrypt= require("bcryptjs")
const router = express.Router();
const Ajouter = require("../../models/incrire");
const jwt=require("jsonwebtoken");


//////VALIDATION/////
const Joi = require("@hapi/joi");

const InscrireSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/signin", async (req, res) => {

  const salt=await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(req.body.password,salt);
  const Client = new Ajouter({
    name:req.body.name,
    email: req.body.email,
    password: hashedpassword,
    tel:req.body.tel,
    Number:req.body.Number
    
  });
  try{
    const savedclient = await Client.save();
    res.send(savedclient)
  }catch(err){
    res.json({message:err})
  }
});

router.post("/login",async(req,res)=>{

  /////VALIDATE INCOMING ADMIN DATA
  const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
  if (error) return res.status(403).send(error.details[0].message);


  try{
    const admin= await Admin.findOne({email:req.body.email})
    if (!admin) return res.status(403).send("Account doesn't exists");

    bcrypt.compare(
      req.body.password,
      admin.password
    );
    const access_token = jwt.sign(
      { Admin: admin._id },
      process.env.ACCESS_TOKEN
    );
    res.send(access_token)
  } catch(err){
    res.json({message:err}) 
  }
  //envoyer otp
  const message = {
    to: savedclient.email,
    from: 'tnu.devops@gmail.com' ,
    templateId:" d-a3ee1044801a48d9af1678a12e818408 ",
      
  
  };
      
      sgMail.send(message);
})

module.exports = router;
