import { createContext, useState, useContext, useEffect } from 'react'
import { registerCall, loginCall } from '../api/auth.js'

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
      const data = response.data
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const loginUser = async (user) => {
    try {
      const response = await loginCall(user)
      const data = response.data
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([])
      }, 5000)
    }
  }, [errors])

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  )
}
