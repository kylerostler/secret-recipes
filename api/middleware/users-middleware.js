const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')
const { findBy } = require('../users/users-model')
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
          })
          .catch(next);
      }
    })
  } else {
    next({ status: 401, message: 'this endpoint is restricted!' });
  }
}
  
  const checkUserPayload = (req, res, next) => {
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
  
module.exports = { checkUserPayload, checkUsernameAvailable, checkUsernameExists, restricted }