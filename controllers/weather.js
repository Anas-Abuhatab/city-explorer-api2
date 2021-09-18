'use strict';

const ForeCast = require("../models/User.models");
const axios =require("axios");

let usersControleer = async (req,res)=>{
    let lat=req.query.lat;
    let lon=req.query.lon;
    let url =`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let axiosRes = await axios.get(url).catch((e)=>{
        console.log(e)
    });
    let weatherData=axiosRes.data;
    let myData =weatherData.data.map(item=>{

        return  new ForeCast (item.datetime ,item.weather.description)
    })

     res.status(200).json(myData);
}




module.exports=usersControleer;