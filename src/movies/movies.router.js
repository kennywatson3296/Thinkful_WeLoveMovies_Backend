const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require('../errors/methodNotAllowed')


//route handler for /movies
router.route("/").get(controller.list).all(methodNotAllowed)

//route handler for /movies/:movieId
router.route("/:movieId").get(controller.read).all(methodNotAllowed)

//route handler for /movies/:movieId/reviews
router.route("/:movieId/reviews").get(controller.readReviews).all(methodNotAllowed)

//route handler for /movies/:movieId/theaters
router.route("/:movieId/theaters").get(controller.readTheaters).all(methodNotAllowed)


module.exports = router