import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressValidator from 'express-validator'
import cors from 'cors'
dotenv.config()

//Import routes

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

//app
const app = express()

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected'))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`server has started on port ${port}`)
})
