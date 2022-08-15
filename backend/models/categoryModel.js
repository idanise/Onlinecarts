import mongoose from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
uuidv4()

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Category', categorySchema)
