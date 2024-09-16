import Blog from '../models/blog.model.js'
import User from '../models/user.model.js'

// get self posts
export const getPosts = async (request, response) => {
  const { id } = request.user

  const posts = await Blog.find({ user: id })
    .select('createdAt _id title description likes user likedBy')
    .sort({ createdAt: -1 })
    .populate({ path: 'user', select: '-_id username' })
    .populate({ path: 'likedBy', select: '-_id username' })
  if (!posts) return response.status(404).json(['No blog posted'])

  response.json(posts)
}

// get the user feed
export const getFeed = async (request, response) => {
  const { id } = request.user

  const userFound = await User.findById(id)
  if (!userFound) response.status(404).json(['User not found'])

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
        (1 - alpha) * post.likes + alpha * (1 / (1 + (now - new Date(post.createdAt).getTime()))),
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
}

// get specific post
export const getPost = async (request, response) => {
  const { id } = request.params

  const post = await Blog.findById(id)
    .select('createdAt _id title description likes user likedBy')
    .populate('user', '-_id username')
    .populate({ path: 'likedBy', select: '-_id username' })

  if (!post) return response.status(404).json(['Not found'])
  response.json(post)
}

// create a post
export const addPost = async (request, response) => {
  const { title, description } = request.body
  const user = request.user.id

  const userFound = await User.findById(user)
  if (!userFound) return response.status(404).json(['User not found'])

  userFound.blogsCount++
  const post = new Blog({ title, description, user })

  try {
    await User.findByIdAndUpdate(user, userFound, { new: true })
    const savedPost = await post.save()
    response.json({
      id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      user: { username: userFound.username },
      createdAt: savedPost.createdAt,
      likes: 0,
      likedBy: [],
    })
  } catch (error) {
    response.status(500).json(['Error creating post'])
  }
}

// delete a post
export const deletePost = async (request, response) => {
  const { id } = request.params
  const user = request.user.id

  const userFound = await User.findById(user)
  if (!userFound) return response.status(404).json(['User not found, try'])

  const post = await Blog.findOneAndDelete({ id, user })
  if (!post) return response.status(404).json(['Blog not found'])

  userFound.blogsCount--
  await User.findByIdAndUpdate(user, userFound, { new: true })
  return response.sendStatus(204)
}

// edit a post
export const updatePost = async (request, response) => {
  const { id } = request.params
  const post = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    .select('createdAt _id title description likes user likedBy')
    .populate('user', '-_id username')
    .populate({ path: 'likedBy', select: '-_id username' })

  if (!post) return response.status(404).json({ message: 'Not found' })
  response.json(post)
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
      const blogUpdated = await Blog.findByIdAndUpdate(id, postFound, { new: true })
        .select('createdAt _id title description likes user likedBy')
        .populate('user', '-_id username')
        .populate({ path: 'likedBy', select: '-_id username' })

      const userUpdated = await User.findByIdAndUpdate(user, userFound, { new: true })
        .select('-_id username likedBlogs')
        .populate({
          path: 'likedBlogs',
          select: '_id title description createdAt likes user likedBy ',
          populate: [
            { path: 'user', select: '_id username' },
            { path: 'likedBy', select: '_id username' },
          ],
        })

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
        .select('createdAt _id title description likes user likedBy')
        .populate('user', '-_id username')
        .populate({ path: 'likedBy', select: '-_id username' })

      const userUpdated = await User.findByIdAndUpdate(user, userFound, { new: true })
        .select('-_id username likedBlogs')
        .populate({
          path: 'likedBlogs',
          select: '_id title description createdAt likes user likedBy ',
          populate: [
            { path: 'user', select: '-_id username' },
            { path: 'likedBy', select: '-_id username' },
          ],
        })

      response.status(200).json({ blogUpdated, userUpdated })
    } catch (error) {
      response.status(500).json(['Error updating post'])
    }
  }
}
