import React, { useState, useEffect } from 'react'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { emptyCart } from './cartHelpers'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [userId, token])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    )
  }

  let deliveryAddress = data.address

  const buy = () => {
    setData({ loading: true })
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data)
        nonce = data.nonce
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // // and also total to be charged
        console.log(
          'send nonce and total to prcoess: ',
          nonce,
          getTotal(products)
        )

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
          options: {
            submitForSettlement: true
          }
        }

        processPayment(userId, token, paymentData)
          .then(response => {
            // console.log(response)
            // create order
            const createOrderData = {
              products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress
            }
            createOrder(userId, token, createOrderData).then(response => {
              emptyCart(() => {
                console.log('Payment success and empty cart')
                setData({ loading: false, success: true })
              })
            })

            // empty cart
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        // console.log('dropin error: ', error)
        setData({ ...data, error: error.message })
        setData({ loading: false })
      })
  }

  const handleAddress = e => {
    setData({ ...data, address: e.target.value })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='form-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Proceed with payment
          </button>
        </div>
      ) : null}
    </div>
  )

  const showError = error => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = success => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Payment was successful
    </div>
  )

  const showLoading = loading => loading && <h2>Loading...</h2>

  return (
    <div>
      <h2>Total: NGN{getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  )
}

export default Checkout
