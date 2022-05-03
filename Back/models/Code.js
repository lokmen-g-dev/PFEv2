const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const OTPSchema = new mongoose.Schema({
 
    OTP: {
      type: String,
      required: true,
    
    },
   
    
  },opts);
  
  const Otp = mongoose.model("OTP", OTPSchema);

  module.exports =Otp;
