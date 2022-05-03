const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const Ajouter = require("../models/Client");
const Joi = require("@hapi/joi");
const verify = require("../routes/Verify");
const parseJwt = require("../routes/Decode");
const Otp = require("../models/Code");
sgMail.setApiKey(process.env.API_KEY);

//////VALIDATION/////
const verif = require("../models/Code");

const Operateur = require("../models/operateur_model");

const InscrireSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
function mail_liste(email,name , code) {
  const message = {
    to: email,
    from: "tnu.devops@gmail.com",
    subject: "Email confirmation",
    templateId: "d-6b1a2a8ca17c471286368441d48d0b28",
    dynamic_template_data: {
      name: name,
      code: code,
    },
  };
  console.log(name);

  sgMail.send(message)
  console.log("Email sent")

}

router.post("/signin", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);
  const code = Math.floor(Math.random() * 10052);
  console.log(code);
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  const client = new Ajouter({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    tel: req.body.tel,
    operateur: req.body.operateur,
  });
  const otp = new Otp({
    OTP: code,
  });

  try {
    const savedclient = await client.save();
    const savedOtp = await otp.save();
    console.log("otp", savedOtp);
    console.log(savedclient);
    // OTP

    const veriftoken = jwt.sign(
      { Client: savedclient._id },
      process.env.ACCESS_TOKEN
    );

    mail_liste(savedclient.email, savedclient.name, savedOtp.OTP);

    res.send({ token: veriftoken, id: savedclient._id });
  } catch (err) {
    res.send({ message: err });
  }
});

//test code OTP

router.put("/verif/:token/:clientId", async (req, res) => {
  try {
    const verified = jwt.verify(req.params.token, process.env.ACCESS_TOKEN);
    if (!verified) return res.send("Acces denied");
    const otp = await Otp.findOne({ OTP: req.body.otp });
    console.log(otp);
    console.log(otp.OTP);
    if (otp.OTP !== req.body.otp) return res.send("wrong OTP")
    console.log("testetst")
    const verifiedclient = await Ajouter.findByIdAndUpdate(
      { _id: req.params.clientId },
      {
        $set: {
          valide: true,
        },
      },
      { new: true }
    );
    console.log(verifiedclient);

    const deletedcode = await Otp.findOneAndDelete({ OTP: otp.OTP });
    console.log(deletedcode);

    res.send("basas");
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/renvoyer/:token/:clientId", async(req,res)=>{

  const verified = jwt.verify(req.params.token, process.env.ACCESS_TOKEN);
    if (!verified) return res.send("Acces denied");
    const otp = await Otp.find();
    console.log("lalalal");
    console.log(otp);
    const Client = await Ajouter.findOne({_id:req.params.clientId});
    console.log(Client)
  try{

    mail_liste(Client.email,Client.name,otp[0].OTP)
    res.send("MI3AW")

  }catch(err){
    res.json({message:err})
  }

})

//login client

router.post("/login", async (req, res) => {
  const loginschema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  /////VALIDATE INCOMING ADMIN DATA
  const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
  if (error) return res.status(403).send(error.details[0].message);

  try {
    const Client = await Ajouter.findOne({ email: req.body.email });
    if (!Client) return res.status(403).send("Account doesn't exists");
    console.log(Client);

    const validpassword = await bcrypt.compare(
      req.body.password,
      Client.password
    );

    if (!validpassword) return res.status(400).send("password is incorrect");
    const access_token = jwt.sign(
      { Client: Client._id },
      process.env.ACCESS_TOKEN
    );
    console.log(access_token);
    res.send(access_token);
  } catch (err) {
    res.json({ message: err });
  }
});

//list user operateur
router.get("/list", verify, async (req, res) => {
  const token = req.header("Authorization");
  console.log(typeof token);
  const operateur = parseJwt(token);
  console.log(typeof operateur);
  console.log(operateur);

  try {
    const Client = await Ajouter.find({ operateur: operateur.Operateur, status:"accepted" });
    res.send(Client);
  } catch (err) {
    res.json({ message: err });
  }
});

//liste des attentes
router.get("/listatt", verify, async (req, res) => {
  const token = req.header("Authorization");
  console.log(typeof token);
  const operateur = parseJwt(token);
  console.log(typeof operateur);
  console.log(operateur);

  try {
    const Client = await Ajouter.find({ operateur: operateur.Operateur, status:"en attente" });
    res.send(Client);
  } catch (err) {
    res.json({ message: err });
  }
});
//accepter client
router.patch("/update/:id", async (req, res) => {
  try {
    
    const client = await Ajouter.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status:"accepted"
          
        },
      },{new:true}
    );
     res.send(client);
    console.log(client)
  }catch (err){
    res.json({message: err});
  }
});




/// ou blie pass
router.post("/forget", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);
  console.log(code);
  const emailcheck = await Operateur.findOne({
    email: req.body.email,
  });
  //inscrit client

  try {
    const savedclient = await emailcheck.save();

    console.log(savedclient.email);
    const message = {
      to: savedclient.email,
      from: "tnu.devops@gmail.com",
      subject: "Emai confirmation",
      templateId: "d-901023562e654d85a7857102fd6ebe3e",
      dynamic_template_data: {
        name: savedclient.name,
        code: code,
      },
    };
    console.log(savedclient.name);

    sgMail.send(message).then(() => {
      console.log("Email sent");
    });
    res.send(savedclient);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
