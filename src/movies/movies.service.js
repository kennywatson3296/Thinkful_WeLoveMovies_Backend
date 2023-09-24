const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

// function to add the critics property to the reviews on the /movies/:movieId/reviews route
const reduceMoviesAndCritics = reduceProperties("review_id", {
        critic_id: ["critic", "critic_id"],
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ['critic', 'organization_name'],
        created_at: ['critic', 'created_at'],
        updated_at: ['critic', 'updated_at'],
    }
)
//lists all the movies
function list(){
    return knex("movies as m")
    .select("*")
}
//lists the movies if the query for is_showing is true
function listShowing() {
    return knex("movies as m").join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({"mt.is_showing": true})
}
//returns a single movie, also used as a function to return if a movie exists
function read(movieId){
    return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first()
}
//lists theaters where the movie is showing at
function readTheaters(movieId){
    return knex("movies_theaters as mt").join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({"mt.movie_id": movieId})
}
//lists reviews for movies
function readReviews(movieId){
    return knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id": movieId})
    .then(reduceMoviesAndCritics)
}

module.exports = {
    list,
    listShowing,
    read,
    readTheaters,
    readReviews,
}