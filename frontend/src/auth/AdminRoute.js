import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '.'

const AdminRoute = () => {
  const isAuth = isAuthenticated() && isAuthenticated().user.role === 1
  return isAuth ? <Outlet /> : <Navigate to='/signin' />
}

export default AdminRoute
