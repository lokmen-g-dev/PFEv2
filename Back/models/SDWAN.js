const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const SDWANSchema = new mongoose.Schema({
 
    ips: {
      type: String,
    
    },
   
    
  },opts);
  
  const SDWAN = mongoose.model("SDWAN", SDWANSchema);

  module.exports =SDWAN;
