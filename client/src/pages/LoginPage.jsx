import { useForm } from 'react-hook-form'

import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <input type="email" {...register('email', { required: true })} placeholder="E-mail" />
        {errors.email && <p>E-mail is required</p>}
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
        />
        {errors.password && <p>Password is required</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default LoginPage
