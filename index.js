import app from './src/app.js'
import { PORT } from './src/config.js'
import { dbConnect } from './src/db.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url)

// Get the directory name of the current module
export const __dirname = dirname(__filename)

dbConnect()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
