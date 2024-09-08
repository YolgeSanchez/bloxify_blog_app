import app from './src/app.js'
import { PORT } from './src/config.js'
import { dbConnect } from './src/db.js'

dbConnect()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
