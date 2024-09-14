import { createContext, useContext, useState } from 'react'
import { postsCall } from '../api/posts.js'

export const PostContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostContextProvider')
  }
  return context
}

export const PostProvider = ({ children }) => {
  const [errors, setErrors] = useState(null)
  const getPosts = async () => {
    try {
      const response = await postsCall()
      const data = response.data
      return data
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  const value = {
    errors,
    getPosts,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
