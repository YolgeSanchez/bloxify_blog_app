import { createContext, useState } from 'react'
import { registerCall } from '../api/auth.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const register = async (user) => {
    const result = await registerCall(user)
    setUser(result)
  }

  return <AuthContext.Provider value={{ register, user }}>{children}</AuthContext.Provider>
}
