import { Router } from 'express'
import { login, logout, register, profile } from '../controllers/auth.controllers.js'
import { validToken } from '../middleware/validateToken.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', validToken, logout)
router.get('/profile', validToken, profile)

export default router
