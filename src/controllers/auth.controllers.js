import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import encrypt from '../libs/SHA256.js'
import { TOKEN_SECRET } from '../config.js'

export const login = async (request, response) => {
  const { email, password } = request.body

  const userFound = await User.findOne({ email })
  if (!userFound) return response.send('User not found')

  const passwordHash = encrypt(password)
  if (passwordHash !== userFound.password) return response.send('Invalid password')

  const token = jwt.sign({ username: userFound.username, email }, TOKEN_SECRET, { expiresIn: '7d' })
  console.log(token)
  response.cookie('token', token)
  response.send('logged in')
}

export const register = async (request, response) => {
  const { username, email, password } = request.body
  const hashedPassword = encrypt(password)
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save()
    const token = jwt.sign({ username, email }, TOKEN_SECRET, { expiresIn: '7d' })
    console.log(token)
    response.cookie('token', token)
    response.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    console.log(error)
    response.status(500).send({ message: 'Error creating user' })
  }
}

export const logout = async (request, response) => {
  response.send('hello')
}

export const profile = async (request, response) => {
  response.send('hello')
}
