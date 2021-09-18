'use strict';

const express =require("express");
const app =express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const axios =require("axios");
const PORT =process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm Working"})
})

let handleWeather = async (req,res)=>{
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

app.get('/weather',handleWeather);


class ForeCast {
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}

let handleMove = async (req,res)=>{
let city=req.query.query;

    let url =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let axiosRes = await axios.get(url).catch((e)=>{
        console.log(e)
    })


    let movieData=axiosRes.data.results.map(item=>{
        
        return new Movies(item.title,item.overview,item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date)
    })


     res.json(movieData)
}

app.get('/movies',handleMove);


class Movies{
    constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on){
    this.title=title;
    this.overview=overview;
    this.average_votes=average_votes;
    this.total_votes=total_votes;
    this.image_url=image_url;
    this.popularity=popularity;
    this.released_on=released_on;
    }
}

app.listen(PORT,()=>{
    console.log(`Listen to PORT :${PORT}`);
})