import { Router } from 'express'
import { validToken } from '../middleware/validateToken.js'
import {
  getPost,
  getPosts,
  addPost,
  deletePost,
  updatePost,
} from '../controllers/posts.controllers.js'

const router = Router()

router.get('/posts', validToken, getPosts)
router.get('/posts/:id', validToken, getPost)
router.post('/posts', validToken, addPost)
router.delete('/posts/:id', validToken, deletePost)
router.put('/posts/:id', validToken, updatePost)

export default router
