const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

const AdminRoute = require("./routes/admin_route");
const OperateuRoute = require("./routes/operateur_route");
const ajouterRoute = require("./routes/Client");
const AjouterRoute = require("./routes/Ajouter")
const AlertRoute = require("./routes/Alert")


app.use('/admin',AdminRoute);
app.use('/operateur',OperateuRoute);

app.use('/Client',ajouterRoute);
app.use('/ajouter',AjouterRoute );
app.use('/alert',AlertRoute)


mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to MongoDB");
    }
  );
  

    app.listen(5000, () => {  
    console.log("server is up and connect")});
 