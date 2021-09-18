"use strict";

const MoviesModel = require("../models/Movies.models");
const axios =require("axios");

let moviesController = async (req, res) => {
    let city = req.query.query;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let axiosRes = await axios.get(url).catch((e) => {
        console.log(e)
    })


    let movieData = axiosRes.data.results.map(item => {

        return new MoviesModel(item.title, item.overview, item.vote_average, item.vote_count, item.poster_path, item.popularity, item.release_date)
    })


    res.json(movieData)
}


module.exports = moviesController;