import axios from 'axios'

const API = 'http://localhost:3000/api'

const register = `${API}/register`
const login = `${API}/login`

export const registerCall = (user) => axios.post(register, user)
export const loginCall = (user) => axios.post(login, user)
