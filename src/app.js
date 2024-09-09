import cookieParser from 'cookie-parser'
import e from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'

const app = e()

// basic middleware
app.use(e.json())
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use(authRoutes)
app.use(postsRoutes)

export default app
