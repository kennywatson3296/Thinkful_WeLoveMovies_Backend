const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

//function to include movies that the theater is showing
const reduceTheaterAndMovies = reduceProperties("theater_id", {
    
    movie_id: ["movies", null, "movie_id"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  })

  //function listing theaters with the movies that they are showing
function list(){
    return knex("theaters as t").join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.movie_id", "m.title", "m.rating", "m.runtime_in_minutes")
    .then(reduceTheaterAndMovies)
}

module.exports = {
    list,
}