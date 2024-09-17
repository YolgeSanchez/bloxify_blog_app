import axios from './axios.js'

export const registerCall = (user) => axios.post('/register', user)
export const loginCall = (user) => axios.post('/login', user)
export const verifyToken = () => axios.get('/verify')
export const profileCall = (user) => axios.get(`/profile/${user}`)
