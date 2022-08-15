import express from 'express'
const router = express.Router()
import {
  userById,
  read,
  update,
  purchaseHistory
} from '../controllers/userController.js'
import {
  requireSignin,
  isAdmin,
  isAuth
} from '../controllers/authController.js'

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
})

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)

router.param('userId', userById)

export default router
