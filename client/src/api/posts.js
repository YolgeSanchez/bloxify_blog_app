import axios from './axios.js'

export const postsCall = (user) => axios.get(`/posts/${user}`)
export const feedCall = () => axios.get('/feed')
export const postCall = (id) => axios.get(`/post/${id}`)
export const likeCall = (id) => axios.put(`/posts/${id}/like`)
export const addPostCall = (post) => axios.post('/posts/', post)
export const removePostCall = (id) => axios.delete(`/posts/${id}`)
export const updatePostCall = (id, post) => axios.put(`/posts/${id}`, post)
