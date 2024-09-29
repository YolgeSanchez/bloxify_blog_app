import { Router } from 'express'
import { validToken } from '../middleware/validateToken.js'
import {
  getPost,
  getPosts,
  getFeed,
  addPost,
  deletePost,
  updatePost,
  changeLike,
} from '../controllers/posts.controllers.js'
import { validateSchema } from '../middleware/dataValidation.js'
import { createBlogSchema } from '../schema/blog.schema.js'
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

// routes
const router = Router()

router.get('/posts/:username', validToken, getPosts)
router.get('/feed', validToken, getFeed)
router.get('/post/:id', validToken, getPost)
router.put('/posts/:id/like', validToken, changeLike)
router.post('/posts', validToken, upload.single('image'), validateSchema(createBlogSchema), addPost)
router.delete('/posts/:id', validToken, deletePost)
router.put(
  '/posts/:id',
  validToken,
  upload.single('image'),
  validateSchema(createBlogSchema),
  updatePost
)

export default router

//TODO: for any type of case also validate it in ftp api
//TODO: add a middleware to check if the user is the owner of the post
