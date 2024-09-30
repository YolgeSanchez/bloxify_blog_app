import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import encrypt from '../libs/SHA256.js'
import { TOKEN_SECRET } from '../config.js'
import path from 'path'
import { __dirname } from '../../index.js'
import fs from 'fs'
import uploadToFTP from '../libs/uploadToFTP.js'

// login
export const login = async (request, response) => {
  const { email, password } = request.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return response.status(404).json(['User not found'])

    const passwordHash = encrypt(password)
    if (passwordHash !== userFound.password) return response.status(401).json(['Invalid password'])

    const token = jwt.sign(
      { id: userFound._id, username: userFound.username, email },
      TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    )
    console.log(token)
    response.cookie('token', token)
    response.status(201).json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    })
  } catch (error) {
    return response.status(404).json(['User not found'])
  }
}

// register
export const register = async (request, response) => {
  const { username, email, password } = request.body

  const userFound = await User.findOne({ username })
  if (userFound) return response.status(500).json(['This username already exists'])

  const emailFound = await User.findOne({ email })
  if (emailFound) return response.status(500).json(['There is already an account with this email'])

  const hashedPassword = encrypt(password)
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    const userSaved = await newUser.save()
    const token = jwt.sign({ id: userSaved._id, username, email }, TOKEN_SECRET, {
      expiresIn: '7d',
    })
    console.log(token)
    response.cookie('token', token)
    response.status(201).json({
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
    })
  } catch (error) {
    console.log(error)
    response.status(500).json(['Error creating user, try again later'])
  }
}

// avatar
export const avatar = async (request, response) => {
  if (!request.file) return response.sendStatus(400)

  // user info
  const username = request.user.username
  const _id = request.user.id

  const user = await User.findById(_id)
  if (!user) return response.status(404).json(['User not found'])

  const oldLocalPath = request.file.path
  const fileExtension = path.extname(request.file.originalname)
  const newFileName = `avatar-${user.username}${fileExtension}`
  const newFilePath = path.join(user.username, newFileName)
  const newLocalPath = path.join(__dirname, 'uploads', newFilePath)

  fs.renameSync(oldLocalPath, newLocalPath)

  //TODO: fetch the upload image to ftp server api
  try {
    const url = await uploadToFTP(user.username, newFileName)
    user.avatarUrl = url
    user.save()
    response.status(200).json(user.avatarUrl)
  } catch (error) {
    console.error('error uploading image to ftp server', error)
    return response.status(500).json(['Error uploading image to FTP server'])
  }

  // in case all good return a good response
}

// logout
export const logout = async (_, response) => {
  response.clearCookie('token')
  response.json(['logged out'])
}

// profile
export const profile = async (request, response) => {
  const { username } = request.params

  try {
    const userFound = await User.findOne({ username }).populate({
      path: 'likedBlogs',
      select: '_id title description createdAt likes user likedBy imageUrl',
      populate: [
        { path: 'user', select: '-_id username' },
        { path: 'likedBy', select: '-_id username' },
      ],
    })
    if (!userFound) return response.status(404).json(['User not found'])

    return response.json({
      email: userFound.email,
      username: userFound.username,
      posts: userFound.blogsCount,
      likes: userFound.likedBlogs,
    })
  } catch (error) {
    return response.status(404).json(['User not found'])
  }
}

// verify token
export const verifyToken = async (request, response) => {
  const { token } = request.cookies

  if (!token || token == '') return response.status(401).json(['Unauthorized'])

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return response.status(401).json(['Unauthorized'])

    const userFound = await User.findById(user.id)
    if (!userFound) return response.status(401).json(['Unauthorized'])

    return response.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    })
  })
}
