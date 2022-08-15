import express from 'express'
const router = express.Router()
import {
  create,
  categoryById,
  read,
  remove,
  update,
  list
} from '../controllers/categoryController.js'
import {
  requireSignin,
  isAdmin,
  isAuth
} from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
)
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
)
router.get('/categories', list)

router.param('categoryId', categoryById)
router.param('userId', userById)

export default router
