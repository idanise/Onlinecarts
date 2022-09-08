import { Order, CartItem } from '../models/orderModel.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import nodemailer from 'nodemailer'
import smtpTrasnport from 'nodemailer-smtp-transport'
import dotenv from 'dotenv'
dotenv.config()

const orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      req.order = order
      next()
    })
}

const create = (req, res) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      })
    }

    //send mail
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   secure: true, // true for 465, false for other ports
    //   tls: {
    //     rejectUnauthorized: false
    //   },
    //   auth: {
    //     user: process.env.EMAIL_USERNAME, // generated ethereal user
    //     pass: process.env.EMAIL_PASSWORD // generated ethereal password
    //   }
    // })

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'dd917e9d437913',
        pass: '5c0eebcd91a161'
      }
    })

    const mailOptions = {
      from: `${process.env.MAIL_FROM}`,
      // to: `${order.user.email}`,
      to: 'daniseiheme@gmail.com',
      subject: 'A new order is received',
      html: `
      <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
      <h2>Customer name: ${order.user.name}</h2>
      <h2>Customer address: ${order.address}</h2>
      <h2>User's purchase history: ${order.user.history.length} purchase</h2>
      <h2>User's email: ${order.user.email}</h2>
      <h2>Total products: ${order.products.length}</h2>
      <h2>Transaction ID: ${order.transaction_id}</h2>
      <h2>Order status: ${order.status}</h2>
      <h2>Product details:</h2>
      <hr />
      ${order.products
        .map(p => {
          return `<div>
                  <h3>Product Name: ${p.name}</h3>
                  <h3>Product Price: ${p.price}</h3>
                  <h3>Product Quantity: ${p.count}</h3>
          </div>`
        })
        .join('--------------------')}
      <h2>Total order cost: ${order.amount}<h2>
      <p>Login to your dashboard</a> to see the order in detail.</p>
  `
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        // console.log(info)
        // return res.status(201).json({
        //   status: true,
        //   message:
        //     'Account created and An email has been sent to you, Check your inbox',
        //   data: user
        // })
        console.log('message successfully sent')
        console.log(info)
        // res.json(data)
      }
    })

    res.json(data)
  })
}

const listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(orders)
    })
}

const getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues)
}

const updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json(order)
    }
  )
}

export { create, listOrders, getStatusValues, orderById, updateOrderStatus }
