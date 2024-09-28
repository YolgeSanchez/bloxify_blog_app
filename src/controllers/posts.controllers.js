import Blog from '../models/blog.model.js'
import User from '../models/user.model.js'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../../index.js'

// get self posts
export const getPosts = async (request, response) => {
  const { username } = request.params

  try {
    const userFound = await User.findOne({ username }).select('_id')
    if (!userFound) return response.status(404).json(['User not found'])

    const user = userFound._id

    try {
      const posts = await Blog.find({ user })
        .select('createdAt _id title description likes user likedBy')
        .sort({ createdAt: -1 })
        .populate({ path: 'user', select: '-_id username' })
        .populate({ path: 'likedBy', select: '-_id username' })
      if (!posts) return response.status(404).json(['No blogs found'])

      response.json(posts)
    } catch (error) {
      return response.status(404).json(['No blogs found'])
    }
  } catch (error) {
    return response.status(404).json(['User not found'])
  }
}

// get the user feed
export const getFeed = async (request, response) => {
  const { id } = request.user

  try {
    const userFound = await User.findById(id)
    if (!userFound) response.status(404).json(['User not found'])

    try {
      const posts = await Blog.find()
        .where('user')
        .ne(id)
        .where('likedBy')
        .ne(id)
        .populate([
          { path: 'user', select: '-_id username' },
          { path: 'likedBy', select: '-_id username' },
        ])
      if (!posts) return response.status(404).json(['No posts found'])

      const now = Date.now()
      const alpha = 0.9

      const sortedPost = posts
        .map((post) => ({
          post,
          score:
            (1 - alpha) * post.likes +
            alpha * (1 / (1 + (now - new Date(post.createdAt).getTime()))),
        }))
        .sort((a, b) => b.score - a.score)

      response.json(
        sortedPost.map(({ post }) => ({
          _id: post._id,
          title: post.title,
          description: post.description,
          user: post.user,
          createdAt: post.createdAt,
          likes: post.likes,
          likedBy: post.likedBy,
        }))
      )
    } catch (error) {
      return response.status(404).json(['No posts found'])
    }
  } catch (error) {
    return response.status(404).json(['User not found'])
  }
}

// get specific post
export const getPost = async (request, response) => {
  const { id } = request.params

  try {
    const post = await Blog.findById(id)
      .select('createdAt _id title description likes user likedBy')
      .populate('user', '-_id username')
      .populate({ path: 'likedBy', select: '-_id username' })

    if (!post) return response.status(404).json(['Not found'])
    response.json(post)
  } catch (error) {
    return response.status(404).json(['Not found'])
  }
}

// create a post
export const addPost = async (request, response) => {
  // verify a file was uploaded
  if (!request.file) return response.status(400).json(['File is required'])

  const { title, description } = request.body
  const user = request.user.id

  const userFound = await User.findById(user)
  if (!userFound) return response.status(404).json(['User not found'])

  userFound.blogsCount++
  const post = new Blog({ title, description, user })

  try {
    await User.findByIdAndUpdate(user, userFound, { new: true })
    const savedPost = await post.save()

    console.log(request.file.path)

    const oldFilePath = request.file.path
    const fileExtension = path.extname(request.file.originalname)
    const newFileName = `post-${savedPost._id}-${userFound.username}${fileExtension}`
    const newFilePath = path.join(__dirname, 'uploads', userFound.username, newFileName)

    fs.renameSync(oldFilePath, newFilePath)
    console.log(newFilePath)

    response.json(true)
  } catch (error) {
    response.status(500).json(['Error creating post'])
  }
}

// delete a post
export const deletePost = async (request, response) => {
  const { id } = request.params
  const user = request.user.id

  try {
    const userFound = await User.findById(user)
    if (!userFound) return response.status(404).json(['User not found'])

    try {
      const post = await Blog.findOneAndDelete({ _id: id, user })
      if (!post) return response.status(404).json(['Blog not found'])

      userFound.blogsCount--
      await User.findByIdAndUpdate(user, userFound, { new: true })
      return response.sendStatus(204)
    } catch (error) {
      return response.status(500).json(['Error deleting, try again later'])
    }
  } catch (error) {
    return response.status(404).json(['Error deleting, try again later'])
  }
}

// edit a post
export const updatePost = async (request, response) => {
  const { id } = request.params
  try {
    const post = await Blog.findByIdAndUpdate(id, request.body, { new: true })
      .select('createdAt _id title description likes user likedBy')
      .populate('user', '-_id username')
      .populate({ path: 'likedBy', select: '-_id username' })

    if (!post) return response.status(404).json({ message: 'Not found' })
    response.json(true)
  } catch (error) {
    return response.status(500).json(['Error updating, try again later'])
  }
}

// like or unlike a post
export const changeLike = async (request, response) => {
  const { id } = request.params
  const user = request.user.id

  const postFound = await Blog.findById(id).populate('user')
  if (!postFound) return response.status(404).json(['Blog not found'])

  const userFound = await User.findById(user)
  if (!userFound) return response.status(404).json(['User not found'])

  const likedBy = postFound.likedBy
  const userLikes = userFound.likedBlogs

  const userInLikes = likedBy.includes(user)
  if (userInLikes) {
    postFound.likes--
    likedBy.splice(likedBy.indexOf(user), 1)
    userLikes.splice(userLikes.indexOf(id), 1)

    try {
      await Blog.findByIdAndUpdate(id, postFound, { new: true })
      await User.findByIdAndUpdate(user, userFound, { new: true })

      response.status(200).json(false)
    } catch (error) {
      response.status(500).json(['Error updating post'])
    }
  } else {
    postFound.likes++
    likedBy.push(user)
    userLikes.push(id)

    try {
      await Blog.findByIdAndUpdate(id, postFound, { new: true })
      await User.findByIdAndUpdate(user, userFound, { new: true })

      response.status(200).json(true)
    } catch (error) {
      response.status(500).json(['Error updating post'])
    }
  }
}
