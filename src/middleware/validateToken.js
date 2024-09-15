import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const validToken = (request, response, next) => {
  const { token } = request.cookies
  if (!token || token == '') return response.status(401).json(['There is no token'])

  jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
    if (error) return response.status(401).json(['Invalid token'])
    request.user = decoded
  })

  next()
}
