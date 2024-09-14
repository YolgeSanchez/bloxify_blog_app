import axios from './axios.js'

export const registerCall = (user) => axios.post('/register', user)
export const loginCall = (user) => axios.post('/login', user)
export const verifyToken = () => axios.get('/verify')

// TODO: implement profile route by username /profile/:username
export const profileCall = () => axios.get('/profile')
