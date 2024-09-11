import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import encrypt from '../libs/SHA256.js'
import { TOKEN_SECRET } from '../config.js'

//login
export const login = async (request, response) => {
  const { email, password } = request.body

  const userFound = await User.findOne({ email })
  if (!userFound) return response.send('User not found')

  const passwordHash = encrypt(password)
  if (passwordHash !== userFound.password) return response.send('Invalid password')

  const token = jwt.sign({ id: userFound._id, username: userFound.username, email }, TOKEN_SECRET, {
    expiresIn: '7d',
  })
  console.log(token)
  response.cookie('token', token)
  response.send('logged in')
}

//register
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
      password: userSaved.password,
    })
  } catch (error) {
    console.log(error)
    response.status(500).send(['Error creating user'])
  }
}

//logout
export const logout = async (request, response) => {
  response.clearCookie('token')
  response.send('logged out')
}

//profile
export const profile = async (request, response) => {
  console.log(request.cookies)

  const { id } = request.user
  const userFound = await User.findById(id)
  console.log(id)
  if (!userFound) return response.status(404).send('User not found')

  return response.json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
    password: userFound.password,
  })
}
