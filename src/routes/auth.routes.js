import { Router } from 'express'

import { login, logout, register, profile } from '../controllers/auth.controllers.js'
import { validToken } from '../middleware/validateToken.js'
import { validateSchema } from '../middleware/dataValidation.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)
router.post('/logout', validToken, logout)
router.get('/profile', validToken, profile)

export default router
