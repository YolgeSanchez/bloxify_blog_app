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
import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname)
  },
})
const upload = multer({ storage })

const router = Router()

router.post('/posts/upload', upload.single('image'), (request, response) => {
  response.json({ message: 'File uploaded successfully', file: request.file })
})
router.get('/posts/:username', validToken, getPosts)
router.get('/feed', validToken, getFeed)
router.get('/post/:id', validToken, getPost)
router.put('/posts/:id/like', validToken, changeLike)
router.post('/posts', validToken, validateSchema(createBlogSchema), addPost)
router.delete('/posts/:id', validToken, deletePost)
router.put('/posts/:id', validToken, validateSchema(createBlogSchema), updatePost)

export default router
