const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//function for listing theaters with movies that are showing
async function list(req, res, next){
    const response = await service.list()

    res.json({ data: response })
}


module.exports = {
    list,
}