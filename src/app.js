if (process.env.USER) require("dotenv").config();
const express = require("express");
//require cors
const cors = require("cors")
const app = express();

//declaring routers
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

//require the errorHandlers
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

//use cors in order to utilize in the frontEnd
app.use(cors())
app.use(express.json())

//connect the app to the routers
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

//connect the error handlers to the app
app.use(notFound)
app.use(errorHandler)

module.exports = app;
