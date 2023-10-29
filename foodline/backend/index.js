//external module
const express = require("express");
const app = express();
const port = 5000;

//external module
const databaseConnection = require("./db")
databaseConnection();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`App listening to port ${port}`);
})