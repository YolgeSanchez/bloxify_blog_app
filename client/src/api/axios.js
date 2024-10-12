import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // this must be equal to the port you specified for the api
  withCredentials: true,
})

export default instance
