import { useForm } from 'react-hook-form'
import { registerCall } from '../api/auth.js'

function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async (user) => {
    const result = await registerCall(user)
  })

  return (
    <div className="registerPage">
      <form onSubmit={onSubmit}>
        <input type="text" {...register('username', { required: true })} placeholder="Username" />
        <input type="email" {...register('email', { required: true })} placeholder="E-mail" />
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
