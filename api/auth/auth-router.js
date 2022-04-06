const router = require('express').Router();
const { checkUserPayload, 
        checkUsernameAvailable, 
        checkUsernameExists, } 
        = require('../middleware/users-middleware')

const User = require('../users/users-model')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

router.post('/register', checkUserPayload, checkUsernameAvailable, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  User.insert({ username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.post('/login', checkUserPayload, checkUsernameExists, (req, res, next) => {
      if (bcrypt.compareSync(req.body.password, req.user.password) ) {
        const token = buildToken(req.user)
        res.json({
          message: `welcome, ${req.user.username}`,
          token
        })
      } else {
        next({ status: 401, message: 'invalid credentials'})
      }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
