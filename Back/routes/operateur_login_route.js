
const express = require("express");
const mongoose = require("mongoose");
const bcrypt= require("bcryptjs")
const router = express.Router();
const Operateur_login = require("../models/operateur_login");
const jwt=require("jsonwebtoken");
const Operateur= require("../models/operateur_model")

const Joi = require("@hapi/joi");
