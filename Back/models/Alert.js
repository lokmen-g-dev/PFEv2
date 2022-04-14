const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const alertSchema = new mongoose.Schema({
 
    Objet: {
      type: String,
     
    },
    discription:{
      type: String,
         },
    Email:{
      type: String,
    }
       
  },opts);
  
  const alert = mongoose.model("alert", alertSchema);

  module.exports = alert;
