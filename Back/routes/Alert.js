const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const aler = require("../models/Alert") ;
const Client= require("./Client");
const { number } = require("@hapi/joi");
const parseJwt = require("../routes/Decode")

sgMail.setApiKey(process.env.API_KEY);
const verify = require("./Verify");
const Operateur = require("../models/operateur_model");

router.post("/Add/:operateur/:clientId", async(req,res)=>{

    console.log("salut")

        const alerts = await new aler({
            Objet:req.body.Objet,
            discription:req.body.discription,
            Operateur:req.params.operateur,
            client:req.params.ClientId
        
    })
   
    try{
        
        const savedalert = await alerts.save();
    //Add operateur
            res.send( savedalert);
    }catch(err){
        res.send({message:err})
    }
 
        
    });


router.post("/aler", async(req,res)=>{

const  token = req.header("Authorization")
    const token_decode = await jwt.decode(token)
    console.log(token_decode)

        const alert = await new aler({
        Objet:req.body.Objet,
        discription:req.body.discription,
        Operateur:token_decode.Client.operateur,
        Client:token_decode.Client.id
      
    })
    
     
    try{        
        const savedalert = await alert.save();
    //Add operateur
            res.send(savedalert);
             
    }catch(err){
        res.send({message:err})
    }

    });

    router.get("/alers/:operateur/:ClientId", async(req,res)=>{
        try{
            const getajoute=await aler.find({Client:req.params.ClientId , Operateur:req.params.operateur});
            res.send(getajoute);

        }catch(err){res.json({message:err})}
    })
    




// get  alert operateur 
router.get("/list", verify ,async(req,res)=>{
    const token = req.header("Authorization");
console.log(typeof(token))
const alert = parseJwt(token) 
console.log(typeof(alert))
console.log(alert)

    try{
      const alet= await aler.find({objet:alert.Operateur});
      res.send(alet);
  }catch(err){res.json({message:err})}
  })


///get alert client 
router.get("/send",async(req,res)=>{
    try{
        const alert= await aler.find();
        res.send(alert);
    }catch(err){res.json({message:err})}
    })


router.delete("/delete/:id",async(req,res)=>{
        try{
            const deletedaler=await aler.findByIdAndDelete({_id:req.params.id});
            console.log(deletedaler);
            res.send("deleted");
        }catch(err){res.json({message:err})}

    })

    //get by id
    router.get("/get/:id",async(req,res)=>{
        try{
            const getajoute=await aler.findById({_id:req.params.id});
            res.send(getajoute);

        }catch(err){res.json({message:err})}

    })
 //Delet operateur
 

module.exports=router;