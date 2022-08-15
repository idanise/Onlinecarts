import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '.'

const PrivateRoute = () => {
  const isAuth = isAuthenticated()
  return isAuth ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
