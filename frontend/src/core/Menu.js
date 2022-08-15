import React, { Fragment } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { signout, isAuthenticated } from '../auth'
import { Navigate } from 'react-router-dom'
import { itemTotal } from './cartHelpers'

const Menu = props => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/shop'>
            <Nav.Link>Shop</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/cart'>
            <Nav.Link>
              Cart
              <sup>
                <small className='cart-badge'>{itemTotal()}</small>
              </sup>
            </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {!isAuthenticated() && (
                <Fragment>
                  <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signin'>
                    <Nav.Link>Signin </Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Nav.Link
                  onClick={() =>
                    signout(() => {
                      ;<Navigate to='/' />
                    })
                  }
                >
                  Signout
                </Nav.Link>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <LinkContainer to='/user/dashboard'>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <LinkContainer to='/admin/dashboard'>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Menu
