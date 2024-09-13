import { useForm } from 'react-hook-form'

import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { loginUser, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (user) => {
    await loginUser(user)
  })

  return (
    <div className="registerPage">
      <form onSubmit={onSubmit}>
        {registerErrors.map((error, i) => (
          <div className="error" key={i}>
            {error}
          </div>
        ))}
        <input
          type="text"
          {...register('email', { required: true })}
          placeholder="E-mail"
          autoComplete="off"
        />
        {errors.email && <p>E-mail is required</p>}
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
          autoComplete="off"
        />
        {errors.password && <p>Password is required</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
export default LoginPage
