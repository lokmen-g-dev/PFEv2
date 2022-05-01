const { object } = require("@hapi/joi");
const mongoose= require("mongoose");
const Operateur = require("./operateur_model");
const opts = { toJSON: { virtuals: true } };

const alertSchema = new mongoose.Schema({
 
    Objet: {
      type: String,
     
    },
    discription:{
      type: String,
         },
    
    nb:{

      type:Number,
      value:1

    },
    Operateur:[{ type: mongoose.Types.ObjectId, ref: "Operateur" }]
       
  },opts);
  
  const alert = mongoose.model("alert", alertSchema);

  module.exports = alert;
