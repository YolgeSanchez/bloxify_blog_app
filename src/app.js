import cookieParser from 'cookie-parser'
import e from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { configDotenv } from 'dotenv'
configDotenv()

import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'
import ftpRoutes from './routes/ftp.routes.js'

const app = e()

// basic middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // allow requests from this origin
    credentials: true, // allow cookies
  })
)
app.use(e.json())
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api', authRoutes)
app.use('/api', postsRoutes)
app.use('/api', ftpRoutes)

export default app
