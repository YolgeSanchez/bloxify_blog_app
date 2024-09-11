import { useForm } from 'react-hook-form'

import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { registerUser, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (user) => {
    await registerUser(user)
  })

  return (
    <div className="registerPage">
      <form onSubmit={onSubmit}>
        {registerErrors.map((error, i) => (
          <div className="error" key={i}>
            {error}
          </div>
        ))}
        <input type="text" {...register('username', { required: true })} placeholder="Username" />
        {errors.username && <p>Username is required</p>}
        <input type="email" {...register('email', { required: true })} placeholder="E-mail" />
        {errors.email && <p>E-mail is required</p>}
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
        />
        {errors.password && <p>Password is required</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
