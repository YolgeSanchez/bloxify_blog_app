import axios from './axios.js'

export const postsCall = (user) => axios.get(`/posts/${user}`)
export const feedCall = () => axios.get('/feed')
