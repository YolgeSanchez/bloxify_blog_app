import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION)
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}
