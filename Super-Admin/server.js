const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

const AdminRoute = require("./routes/admin_route");
const OperateurRoute = require("./routes/operateur_route");

app.use('/admin',AdminRoute);
app.use('/operateur',OperateurRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to MongoDB");
    }
  );

  app.listen(5000);