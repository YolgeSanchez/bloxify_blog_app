import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogsCount: {
    type: Number,
    default: 0,
  },
  likedBlogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Blog',
    default: [],
  },
})

export default mongoose.model('User', userSchema)
