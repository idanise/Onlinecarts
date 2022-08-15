import React from 'react'
import Layout from '../../core/Layout'
import { isAuthenticated } from '../../auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Create Product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders'>
              View Orders
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    )
  }

  const greetUser = () => {
    const date = new Date()
    const hour = date.getHours()
    let greeting
    if (hour >= 16) {
      greeting = 'Welcome back, Good evening'
    }
    if (hour >= 12) {
      greeting = 'Welcome back, Good afternoon'
    } else {
      greeting = 'Welcome back, Good morning'
    }
    return greeting
  }

  return (
    <Layout
      title='Dashboard'
      description={`${greetUser()} ${name}`}
      className='container'
    >
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-9'>{adminInfo()}</div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
