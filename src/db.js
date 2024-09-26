import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoDBConnection)
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}
