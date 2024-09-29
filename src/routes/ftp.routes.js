import { Router } from 'express'
import { getFtpImage } from '../controllers/ftp.controllers.js'

const router = Router()

// routes
router.get('/uploads/:user/:image', getFtpImage)

export default router
