const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

const OperateurRoute = require("./routes/Client");


app.use('/Client',OperateurRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to MongoDB");
    }
  );

  app.listen(5000);