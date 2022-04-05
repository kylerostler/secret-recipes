const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')
const { findBy } = require('../users/users-model')

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
  
  const checkRegPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      next({ status: 422, message: 'username and password required'})
    } else {
      next()
    }
  }
  
  const checkUsernameAvailable = async (req, res, next) => {
    try {
      const [user] = await findBy({ username: req.body.username})
      if(!user) {
        req.user = user
        next()
      } else {
        next({ status: 401, message: 'username taken'})
      }
    } catch (err) {
      next(err)
    }
  }
  
  const checkUsernameExists = async (req, res, next) => {
    try {
      const [user] = await findBy({ username: req.body.username})
      if(user) {
        req.user = user
        next()
      } else {
        next({ status: 401, message: 'invalid credentials'})
      }
    } catch (err) {
      next(err)
    }
  }
  
module.exports = { restricted, checkRegPayload, checkUsernameAvailable, checkUsernameExists }