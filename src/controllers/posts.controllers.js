import Blog from '../models/blog.model.js'

// get self posts
export const getPosts = async (request, response) => {
  const { id } = request.user
  try {
    const posts = await Blog.find().sort({ createdAt: -1, createdByID: id })
    response.json(posts)
  } catch (error) {
    response.status(500).json({ message: 'Error fetching posts' })
  }
}

// get specific post
export const getPost = async (request, response) => {}
// create a post
export const addPost = async (request, response) => {}
// delete a post
export const deletePost = async (request, response) => {}
// edit a post
export const updatePost = async (request, response) => {}
