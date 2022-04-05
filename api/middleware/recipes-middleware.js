const { getRecipeById, getRecipes, insert } = require('../recipes/recipes-model')
const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
     return next({ status: 401, message: 'token required'})
    } 
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
     if (err) {
       next({ status: 401, message: 'token invalid'})
     } else {
       req.decodedToken = decodedToken
       next()
     }
    })
};

//need to flush out middleware for posts and update requests

module.exports = { restricted }