const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Operateur = require("../models/operateur_model");
const Oublier = require("../models/Forgot")
const Joi = require("@hapi/joi");

const loginschema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});


//login
router.post("/login", async (req, res) => {
  /////VALIDATE INCOMING ADMIN DATA
  const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
  if (error) return res.status(403).send(error.details[0].message);

  try {
    const operateur = await Operateur.findOne({ email: req.body.email });
    if (!operateur) return res.status(403).send("Account doesn't exists");
    console.log(operateur);
    
    const validpassword = await bcrypt.compare(
      req.body.password,
      operateur.password
    );
    //console.log(validpassword);
    if (!validpassword) return res.status(400).send("password is incorrect");
    const access_token = jwt.sign(
      { Operateur: operateur.name },
      process.env.ACCESS_TOKEN
    );
    console.log(access_token);
    res.send(access_token);
  } catch (err) {
    res.json({ message: err });
  }
});





//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedOperateur = await Operateur.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(deletedOperateur);
    res.send("deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

//add operateur

router.post("/signin", async (req, res) => {
  const emailcheck = await Operateur.findOne({
    email: req.body.email,
  });

  if (emailcheck) return res.status(400).send("Email already exists");
  const salt=await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(req.body.password,salt);
  const operateur = await new Operateur({
    name: req.body.name,
    password:hashedpassword,
    email: req.body.email,
    tel: req.body.tel,
  });

  try {
    const savedOperateur = await operateur.save();
  
    //Add operateur
    console.log("salut")
    
    const message = {
      to: savedOperateur.email,
      from: "tnu.devops@gmail.com",
      subject: "Email confirmation",
      templateId: "d-901023562e654d85a7857102fd6ebe3e",
      dynamic_template_data: {
        email: savedOperateur.email,
        tel: savedOperateur.tel,
        name: savedOperateur.name,
        password: savedOperateur.password,
      
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

router.get("/overview", async (req, res) => {
  try {
    const operateur = await Operateur.find();
    res.send(operateur);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedOperateur = await Operateur.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(deletedOperateur);
    res.send("deleted");
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/get", async (req, res) => {
  try {
    const operateur = await Operateur.find();
    res.send(operateur);
  } catch (err) {
    res.json({ message: err });
  }
});

// forget password

router.post("/forget", async (req, res) => {
  const emailcheck = await Operateur.findOne({
    email: req.body.email,
  });
  if (!emailcheck) return res.status(400).send("Email already exists");
  try {
    //Add operateur
    const message = {
      to: Operateur.email,
      from: "tnu.devops@gmail.com",
      subject: "Email confirmation",
      templateId: "d-901023562e654d85a7857102fd6ebe3e",
      dynamic_template_data: {
        email: Operateur.email,
      },
    };
    console.log("sennd")

    sgMail
      .send(message)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

  
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
