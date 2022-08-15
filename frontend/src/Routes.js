import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import UserDashboard from './components/user/UserDashboard'
import AdminDashboard from './components/user/AdminDashboard'
import AddCategory from './components/admin/AddCategory'
import AddProduct from './components/admin/AddProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './components/admin/Orders'
import Profile from './components/user/Profile'
import ManageProducts from './components/admin/ManageProducts'

const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/create/category' element={<AddCategory />} />
          <Route path='/create/product' element={<AddProduct />} />
          <Route
            path='/admin/product/update/:productId'
            element={<UpdateProduct />}
          />
          <Route path='/admin/products' element={<ManageProducts />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routess
