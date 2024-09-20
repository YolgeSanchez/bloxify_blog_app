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
  const [errors, setErrors] = useState([])

  // get all posts of a user
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

  // get a specific post by its id
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

  // get the feed of the current user logged in
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

  // add a new post
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

  // update an existing post
  const updatePost = async (id, post) => {
    try {
      const response = await updatePostCall(id, post)
      const data = response.data
      return data
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  // change the like state of a user with a post
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
