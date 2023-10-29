//external module
const express = require("express");
const app = express();
const dotenv = require("dotenv").config()

//external module
const databaseConnection = require("./configuration/db");
const userRoute = require("./routes/userRoute");
databaseConnection();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

//use user Route
app.use("/api",userRoute);


// server start
app.listen(process.env.PORT,()=>{
    console.log(`App listening to port ${process.env.PORT}`);
})