import Blog from '../models/blog.model.js'

// get self posts
export const getPosts = async (request, response) => {
  const { id } = request.user
  const posts = await await Blog.find({ user: id }).sort({ createdAt: -1 }).populate('user')
  if (!posts) return response.status(404).json({ message: 'No blog posted' })
  response.json(posts)
}

// get specific post
export const getPost = async (request, response) => {
  const { id } = request.params
  const post = await Blog.findById(id).populate('user')
  if (!post) return response.status(404).json({ message: 'Not found' })
  response.json(post)
}
// create a post
export const addPost = async (request, response) => {
  const { title, description } = request.body
  const user = request.user.id
  const post = new Blog({ title, description, user })
  try {
    const savedPost = await post.save()
    response.json({
      id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      user: savedPost.user,
      createdAt: savedPost.createdAt,
    })
  } catch (error) {
    response.status(500).json({ message: 'Error creating post' })
  }
}
// delete a post
export const deletePost = async (request, response) => {
  const { id } = request.params
  const post = await Blog.findByIdAndDelete(id)
  if (!post) return response.status(404).json({ message: 'Not found' })
  return response.sendStatus(204)
}
// edit a post
export const updatePost = async (request, response) => {
  const { id } = request.params
  const post = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  if (!post) return response.status(404).json({ message: 'Not found' })
  response.json(post)
}
