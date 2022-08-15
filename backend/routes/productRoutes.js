import express from 'express'
const router = express.Router()
import {
  requireSignin,
  isAdmin,
  isAuth
} from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'
import {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} from '../controllers/productController.js'

router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAuth,
  isAdmin,
  remove
)
//update product
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAuth,
  isAdmin,
  update
)

//Queries
router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo)

router.param('userId', userById)
router.param('productId', productById)

export default router
