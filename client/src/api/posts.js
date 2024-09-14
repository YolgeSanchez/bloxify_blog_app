import axios from './axios.js'

// TODO: get posts by username '/posts/:username'
export const postsCall = () => axios.get('/posts')
