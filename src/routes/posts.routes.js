import { Router } from 'express'

import { validToken } from '../middleware/validateToken.js'
import {
  getPost,
  getPosts,
  addPost,
  deletePost,
  updatePost,
  changeLike,
} from '../controllers/posts.controllers.js'
import { validateSchema } from '../middleware/dataValidation.js'
import { createBlogSchema } from '../schema/blog.schema.js'

const router = Router()

router.get('/posts', validToken, getPosts)
router.get('/posts/:id', validToken, getPost)
router.put('/posts/:id/like', validToken, changeLike)
router.post('/posts', validToken, validateSchema(createBlogSchema), addPost)
router.delete('/posts/:id', validToken, deletePost)
router.put('/posts/:id', validToken, updatePost)

export default router
