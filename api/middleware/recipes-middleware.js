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

const checkRecipeId = (req, res, next) => {
  getRecipeById(req.params.id)
    .then(recipe => {
      if (recipe) {
        req.recipe = recipe
        next()
      } else {
        next({ status: 404, message: `recipe at ${req.params.id} not found`})
      }
    })
    .catch(next)
}

const checkRecipePayload = (req, res, next) => {
  if (!req.body.recipe_name || !req.body.source || !req.body.category) {
    next({ status: 422, message: 'recipe information required'})
  } else {
    next()
  }
}

const checkIngredientPayload = (req, res, next) => {
  if (!req.body.ingredient_name || !req.body.ingredient_unit) {
    next({ status: 422, message: 'ingredient information required'})
  } else {
    next()
  }
}

const checkStepPayload = (req, res, next) => {
  if (!req.body.step_text || !req.body.step_number || typeof req.body.step_number != Number || !req.body.recipe_id) {
    next({ status: 422, message: 'step information required'})
  } else {
    next()
  }
}
//need to flush out middleware for posts and update requests

module.exports = { 
  restricted, 
  checkRecipePayload, 
  checkIngredientPayload, 
  checkStepPayload,
  checkRecipeId }