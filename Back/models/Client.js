const { boolean } = require("@hapi/joi");
const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const InscrireSchema = new mongoose.Schema({
 
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
        required:true,

    },
  password: {
      type: String,
      required: true,
    }, 
    tel: {
      type: Number,
      required:true,
  },
   operateur:{
     type:String,
     
   },
   valide:{
    type:Boolean,
    required:true,

   
  },
  

 
  
    
  },opts);
  
  const Ajouter = mongoose.model("Ajouter", InscrireSchema);

  module.exports = Ajouter;
