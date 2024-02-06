import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',
      default: ''
    },
    password: {
      type: 'string',
      default: ''
    },
    role: {
      type: 'string',
      default: 'regular'
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
