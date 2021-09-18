'use strict';

const express =require("express");
const app =express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT =process.env.PORT;
const usersControleer=require("./controllers/weather");
const moviesController=require("./controllers/movies");

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm Working"})
})
app.get('/weather',usersControleer);
app.get('/movies',moviesController);
app.listen(PORT,()=>{
    console.log(`Listen to PORT :${PORT}`);
})