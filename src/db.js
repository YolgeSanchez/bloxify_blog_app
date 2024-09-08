import mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost/blogApp')
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}
