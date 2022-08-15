import { generateKey } from 'crypto'
import express, { Router } from 'express'
import { requireSignin, isAuth } from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'
import { generateToken, processPayment } from '../controllers/braintree.js'
const router = express.Router()

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment)

router.param('userId', userById)

export default router
