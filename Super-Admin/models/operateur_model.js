const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const OperateurSchema = new mongoose.Schema({
 
    name: {
      type: String,
      required: true,
    },
  password: {
      type: String,
      required: true,
    },
   
    email:{
      type: String,
        required:true,

    },
    tel: {
      type: String,
      required:true,
  },
    
  },opts);
  
  const Operateur = mongoose.model("Operateur", OperateurSchema);

  module.exports = Operateur;
