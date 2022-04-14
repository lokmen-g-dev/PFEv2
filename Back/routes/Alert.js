const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const aler = require("../models/Alert") ;
const Client= require("../routes/Client")
sgMail.setApiKey(process.env.API_KEY);


router.post("/aler", async(req,res)=>{

    console.log("salut")

        const alert = await new aler({
        Objet:req.body.Objet,
        discription:req.body.discription,
        Email:Client.email
    })
   
    try{
        
        const savedalert = await alert.save();
    //Add operateur
            res.send(savedalert);
    }catch(err){
        res.send({message:err})
    }
 
        
    });
///get 
router.get("/send",async(req,res)=>{
    try{
        const alert= await aler.find();
        res.send(alert);
    }catch(err){res.json({message:err})}
    })


 //Delet operateur
 

module.exports=router;