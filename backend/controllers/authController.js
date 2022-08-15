import User from '../models/userModel.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import jwtT from 'jsonwebtoken' // to generate signed token
import { expressjwt as jwt } from 'express-jwt' // for auth
import dotenv from 'dotenv'
dotenv.config()

const signup = (req, res) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({
      user
    })
  })
}

const signin = (req, res) => {
  //find the user based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please sign up!'
      })
    }

    //Auth user - user and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match"
      })
    }

    // generate a signed token with user id and secret
    const token = jwtT.sign({ _id: user._id }, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    // res.cookie('t', token, { expire: new Date() + 9999 })
    res.cookie('t', token, { expire: 9999 })
    //return response with user and token to frontend client
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  })
}

const signout = (req, res) => {
  x
  res.clearCookie('t')
  res.json({
    message: 'Signout success'
  })
}

const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256']
})

const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    })
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied'
    })
  }
  next()
}

export { signup, signin, signout, requireSignin, isAdmin, isAuth }
