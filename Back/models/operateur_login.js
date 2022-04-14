const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const Operateur_loginSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
},opts);

const  Operateur_login = mongoose.model(" Operateur_login", Operateur_loginSchema);

module.exports = Operateur_login;