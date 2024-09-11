import axios from 'axios'

const API = 'http://localhost:3000/api'
const register = `${API}/register`

export const registerCall = (user) => axios.post(register, user)
