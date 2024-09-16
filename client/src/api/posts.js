import axios from './axios.js'

export const feedCall = () => axios.get('/feed')

// TODO: get posts by username '/posts/:username'
export const postsCall = () => axios.get('/posts')
