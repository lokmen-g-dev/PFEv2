const mongoose= require("mongoose");
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

    }
       
  },opts);
  
  const alert = mongoose.model("alert", alertSchema);

  module.exports = alert;
