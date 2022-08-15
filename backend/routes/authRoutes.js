import express from 'express'
const router = express.Router()
import {
  signup,
  signin,
  signout,
  requireSignin
} from '../controllers/authController.js'
import userSignupValidator from '../validator/index.js'

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

router.get('/hello', requireSignin, (req, res) => {
  res.send('hello there')
})

export default router
