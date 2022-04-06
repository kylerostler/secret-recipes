const { getRecipeById } = require('../recipes/recipes-model')
const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')
const User = require('../users/users-model')

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if(err) {
        next({ status: 401, message: 'invalid token' });
      } else {
        User.findById(decodedJwt.subject)
          .then(user => {
            if(user.logged_out_time > decodedJwt.iat) {
              next({ status: 401, message: 'user was logged out' });
            } else {
              console.log(decodedJwt);
              req.decodedJwt = decodedJwt;
              next();
            }
          });
      }
    })
  } else {
    next({ status: 401, message: 'this endpoint is restricted!' });
  }
}

const checkRecipeId = (req, res, next) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => {
      if (recipe) {
        req.recipe = recipe
        next()
      } else {
        next({ status: 404, message: `recipe not found`})
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
  if (!req.body.step_text || !req.body.step_number || !req.body.recipe_id) {
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