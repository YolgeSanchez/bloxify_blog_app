import { createContext, useContext, useState } from 'react'
import {
  addPostCall,
  feedCall,
  likeCall,
  postCall,
  postsCall,
  updatePostCall,
} from '../api/posts.js'

export const PostContext = createContext()

export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostContextProvider')
  }
  return context
}

export const PostProvider = ({ children }) => {
  const [errors, setErrors] = useState(null)

  const getPosts = async (user) => {
    try {
      const response = await postsCall(user)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const getPost = async (id) => {
    try {
      const response = await postCall(id)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const getFeed = async () => {
    try {
      const response = await feedCall()
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const addPost = async (post) => {
    try {
      const response = await addPostCall(post)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const updatePost = async (post) => {
    try {
      const response = await updatePostCall(post)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const changeLike = async (id) => {
    try {
      const response = await likeCall(id)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const value = {
    errors,
    getPosts,
    getPost,
    addPost,
    updatePost,
    getFeed,
    changeLike,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
