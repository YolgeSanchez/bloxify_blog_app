import { createContext, useState, useContext } from 'react'
import { registerCall } from '../api/auth.js'

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const registerUser = async (user) => {
    try {
      const response = await registerCall(user)
      const data = await response.json()
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <AuthContext.Provider value={{ registerUser, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  )
}
