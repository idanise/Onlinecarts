import express, { Router } from 'express'
import {
  requireSignin,
  isAuth,
  isAdmin
} from '../controllers/authController.js'
import {
  userById,
  addOrderToUserHistory
} from '../controllers/userController.js'
import {
  create,
  listOrders,
  getStatusValues,
  updateOrderStatus, 
  orderById
} from '../controllers/orderController.js'
import { decreaseQuantity } from '../controllers/productController.js'
const router = express.Router()

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
)
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
)
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
)

router.param('userId', userById)
router.param('orderId', orderById)

export default router
