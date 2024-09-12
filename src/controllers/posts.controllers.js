import Blog from '../models/blog.model.js'
import User from '../models/user.model.js'

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

// like or unlike a post
export const changeLike = async (request, response) => {
  const { id } = request.params
  const user = request.user.id

  /*
   * @field {list} BlogsLiked in User model
   * @field {list} LikedBy in Blog model
   * @field {number} likes in Blog model
   */

  const postFound = await Blog.findById(id).populate('user')
  if (!postFound) return response.status(404).json({ message: 'Blog not found' })

  const userFound = await User.findById(user)
  if (!userFound) return response.status(404).json({ message: 'User not found' })

  const likedBy = postFound.likedBy
  const userLikes = userFound.likedBlogs

  const userInLikes = likedBy.includes(user)
  if (userInLikes) {
    postFound.likes--
    likedBy.splice(likedBy.indexOf(user), 1)
    userLikes.splice(userLikes.indexOf(id), 1)

    try {
      const blogUpdated = await Blog.findByIdAndUpdate(id, postFound, { new: true })
      const userUpdated = await User.findByIdAndUpdate(user, userFound, { new: true })
      response.status(200).json({ blogUpdated, userUpdated })
    } catch (error) {
      response.status(500).json(['Error updating post'])
    }
  } else {
    postFound.likes++
    likedBy.push(user)
    userLikes.push(id)

    try {
      const blogUpdated = await Blog.findByIdAndUpdate(id, postFound, { new: true })
      const userUpdated = await User.findByIdAndUpdate(user, userFound, { new: true })
      response.status(200).json({ blogUpdated, userUpdated })
    } catch (error) {
      response.status(500).json(['Error updating post'])
    }
  }

  // reviso a ver si el usuario que llamo la accion le ha dado o no like
  // si le ha dado like entonces lo quitare
  // si no le ha dado entonces lo agregare
}
