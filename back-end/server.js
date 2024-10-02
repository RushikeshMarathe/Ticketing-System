const express = require("express");

const app = express();
require("dotenv").config();
app.use(express.json());
const dbConnect = require("./config/database");

dbConnect.dbConnect();

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is running on Port 3000");
    console.log("Server Started Successfully");
});