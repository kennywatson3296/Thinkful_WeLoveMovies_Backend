const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

//Add a critic category to the updated review
const addCritic = mapProperties( {
    c_critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name:  "critic.organization_name",
    c_created_at: "critic.created_at",
    c_updated_at: "critic.updated_at",
})

//update function for reviews
function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
}

//function utitilized to test if a review exists and adds the critic category
function read(reviewId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", 
    "c.critic_id as c_critic_id", 
    "c.preferred_name",
    "c.surname", 
    "c.organization_name",
    "c.created_at as c_created_at", 
    "c.updated_at as c_updated_at")
    .where({"r.review_id": reviewId})
    .first()
    .then(addCritic)
}
//function to delete a review based on a review id
function destroy(reviewId){
return knex("reviews")
.where({"review_id": reviewId})
.del()
}


module.exports = {
    update,
    delete: destroy,
    read,
}