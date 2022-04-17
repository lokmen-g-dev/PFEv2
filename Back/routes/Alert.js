const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const aler = require("../models/Alert") ;
const Client= require("./Client");
const { number } = require("@hapi/joi");
sgMail.setApiKey(process.env.API_KEY);


router.post("/aler", async(req,res)=>{


  

        const alert = await new aler({
        Objet:req.body.Objet,
        discription:req.body.discription,
        
         
        
    })
    
 
 
    try{
        
        const savedalert = await alert.save();
    //Add operateur
            res.send(savedalert);
             console.log(savedalert.nb)
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