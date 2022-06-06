const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const Ajouter = require("../models/Client");
const test = require("../models/Test");
const est = require("../models/est");
const fg02 = require("../models/est");
const Policy = require("../models/Policy");
const Sdwan = require("../models/SDWAN");

const Joi = require("@hapi/joi");
const verify = require("../routes/Verify");
const parseJwt = require("../routes/Decode");
const Otp = require("../models/Code");
const FG01 = require("../models/FGT-AG-01");
const fg = require("../models/FGT-AG-01");
const static = require("../models/Route");

const fg00 = require("../models/est");
sgMail.setApiKey(process.env.API_KEY);

//////VALIDATION/////
const verif = require("../models/Code");

const Operateur = require("../models/operateur_model");

const InscrireSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
function mail_liste(email, name, code) {
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

  sgMail.send(message);

  
  console.log("Email sent");
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

router.put("/verif", async (req, res) => {
  const token = req.header("Authorization");
  const token_decode = await jwt.decode(token);
  console.log(token_decode);

  try {
    const otp = await Otp.findOne({ OTP: req.body.otp });
    console.log(otp);
    console.log(otp.OTP);
    if (otp.OTP !== req.body.otp) return res.send("wrong OTP");
    console.log("testetst");
    const verifiedclient = await Ajouter.findByIdAndUpdate(
      { _id: token_decode.Client },
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

router.post("/renvoyer/:token/:clientId", async (req, res) => {
  const verified = jwt.verify(req.params.token, process.env.ACCESS_TOKEN);
  if (!verified) return res.send("Acces denied");
  const otp = await Otp.find();
  console.log("lalalal");
  console.log(otp);
  const Client = await Ajouter.findOne({ _id: req.params.clientId });
  console.log(Client);
  try {
    mail_liste(Client.email, Client.name, otp[0].OTP);
    res.send("MI3AW");
  } catch (err) {
    res.json({ message: err });
  }
});

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
    const client = await Ajouter.findOne({ email: req.body.email });
    if (!client) return res.status(403).send("Account doesn't exists");
    console.log(client);

    const validpassword = await bcrypt.compare(
      req.body.password,
      client.password
    );
    console.log("hiii");
    if (!validpassword) return res.status(400).send("password is incorrect");
    const access_token = jwt.sign(
      { Client: { id: client._id, operateur: client.operateur } },
      process.env.ACCESS_TOKEN
    );
    console.log(access_token);
    res.send(access_token);
  } catch (err) {
    res.json({ message: err });
  }
});

///modifier profile
router.patch("/updat", async (req, res) => {
  const token = req.header("Authorization");
  const token_decode = await jwt.decode(token);
  console.log(token_decode);

  try {
    const oerateur = await Ajouter.findOneAndUpdate(
      { _id: token_decode.Client.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          tel: req.body.tel,
        },
      },
      { new: true }
    );
    res.send(oerateur);
    console.log(oerateur);
  } catch (err) {
    res.json({ message: err });
  }
});




//get profile

router.get("/profile", async (req, res) => {
  const token = req.header("Authorization");
  const token_decode = await jwt.decode(token);
  console.log(token_decode);
  try {
    const getajoute = await Ajouter.findById({
      _id: token_decode.Client.id,
    });
    res.send(getajoute);
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
    const Client = await Ajouter.find({
      operateur: operateur.Operateur.name,
      status: "accepted",
    });
    res.send(Client);
  } catch (err) {
    res.json({ message: err });
  }
});

//liste des attentes
router.get("/listatt", verify, async (req, res) => {
  const token = req.header("Authorization");
  console.log(typeof token);
  const operateur = jwt.decode(token);
  console.log(typeof operateur);
  console.log(operateur);

  try {
    const Client = await Ajouter.find({
      operateur: operateur.Operateur.name,
      status: "en attente",
    });
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
          status: "accepted",
        },
      },
      { new: true }
    );
    res.send(client);
    console.log(client);
  } catch (err) {
    res.json({ message: err });
  }
});

// test oublier mot de passe

router.post("/test", async (req, res) => {
  const ajouter = await new Otp({
    OTP: req.body.otp,
  });

  try {
    const savedajouter = await ajouter.save();
    console.log(savedajouter.OTP);

    const otp = await Otp.findOne({ Otp });
    console.log(otp);

    if (otp.OTP !== req.body.otp) return res.send("wrong OTP");
    console.log("testetst");

    console.log(verifiedclient);

    res.send("basas");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const getajoute = await aler.findById({ _id: req.params.id });
    res.send(getajoute);
  } catch (err) {
    res.json({ message: err });
  }
});

/// ou blie pass
router.post("/forget", async (req, res) => {
  ///validate all the incoming data in the body
  //const { error } = InscrireSchema.validate(req.body);
  //if (error) return res.send(error.details[0].message);
  const emailcheck = await Operateur.findOne({
    email: req.body.email,
  });

  const otp = await Otp.find();

  if (!emailcheck) return res.status(400).send("Email is not  exists");
  try {
    const savedclient = await emailcheck.save();
    const otp = await Otp.find();

    console.log(otp);
    mail_liste(savedclient.email, savedclient.name, otp[0].OTP);

    const deletedcode = await Otp.findOneAndDelete({ OTP: otp.OTP[0] });
    console.log(deletedcode);
    res.send(savedclient);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const getajoute = await aler.findById({ _id: req.params.id });
    res.send(getajoute);
  } catch (err) {
    res.json({ message: err });
  }
});


router.get("/test", async (req, res) => {
  try {
    const alert = await test.find();
    console.log(alert);
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});

///get  fortigate
router.get("/fortigate01/", async (req, res) => {
  try {
    const alert = await est.find();
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});

//interface get
router.get("/fortigate/:nom", async (req, res) => {
  try {
    const alert = await FG01.findOne({ ip_fortigate: req.params.nom });
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});

//policy get
router.get("/policy", async (req, res) => {
  try {
    const alert = await Policy.find();
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});
// stattic get
router.get("/static", async (req, res) => {
  try {
    const alert = await static.find();
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});
//sdwan get
router.get("/sdwan", async (req, res) => {
  try {
    const alert = await Sdwan.find();
    res.send(alert);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/sdwan", async (req, res) => {
  const alert = await new Sdwan({
    ips: req.body.ip,
  });

  try {
    const savedalert = await alert.save();
    //Add operateur
    res.send(savedalert);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
