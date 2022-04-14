const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const verifSchema = new mongoose.Schema({
 
    OTP: {
      type: String,
      required: true,
    
    },
   
    
  },opts);
  
  const verif = mongoose.model("verif", verifSchema);

  module.exports = verif;
