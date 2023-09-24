const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//lists movies and handles the query if it's used
async function list(req, res, next) {
    if (req.query) {
      if(req.query.is_showing === "true"){
        res.json({ data: await service.listShowing() })}
    }
    res.json({ data: await service.list() });
  }


//function to verify if a movie is indeed in the database
async function movieExists(req, res, next){
    const {movieId} = req.params
    const movie = await service.read(movieId)
    if(movie){
        res.locals.movie = movie
        return next()
    }
    return next({ status: 404, message: `Movie cannot be found`})
}

//returns a single movie
async function read(req, res, next){
    const {movie} = res.locals
    res.json({ data: movie })
}

//returns theaters that the movie is showing
async function readTheaters(req, res, next){
    const {movieId} = req.params
    const data = await service.readTheaters(movieId)
    res.json({ data })
}

//returns reviews for a movie including critic details
async function readReviews(req, res, next){
    const {movieId} = req.params
    const response = await service.readReviews(movieId)
    const result = response.map((res)=> res)
    res.json({ data: result })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)]

}