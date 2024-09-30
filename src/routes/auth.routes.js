import { Router } from 'express'

import {
  login,
  logout,
  register,
  profile,
  verifyToken,
  avatar,
} from '../controllers/auth.controllers.js'
import { validToken } from '../middleware/validateToken.js'
import { validateSchema } from '../middleware/dataValidation.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'
import path from 'path'
import fs from 'fs'
import { __dirname } from '../../index.js'

// multer configs
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const user = request.user.username
    const dir = path.join(__dirname, 'uploads', user)

    // check if the user directory exists
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    callback(null, dir)
  },
  filename: function (request, file, callback) {
    // this filename is temporary and will be overwritten
    callback(null, file.originalname)
  },
})

const upload = multer({
  storage,
  fileFilter: (request, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') return callback(null, true)
    callback(new Error('Only JPEG and PNG formats are allowed!'), false)
  },
})

const router = Router()

router.post('/login', validateSchema(loginSchema), login)
router.post('/avatar', validToken, upload.single('image'), avatar)
router.post('/register', validateSchema(registerSchema), register)
router.post('/logout', validToken, logout)
router.get('/verify', verifyToken)
router.get('/profile/:username', validToken, profile)

export default router
