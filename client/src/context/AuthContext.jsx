import { createContext, useState, useContext } from 'react'
import { axiosRegister, registerCall } from '../api/auth.js'

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

  const registerUser = async (user) => {
    try {
      const result = await axiosRegister(user)
      console.log(result)
      setUser(result)
      setIsAuthenticated(true)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <AuthContext.Provider value={{ registerUser, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
