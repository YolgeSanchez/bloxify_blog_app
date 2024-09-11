import { useForm } from 'react-hook-form'

function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async (values) => {
    console.log(values)
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
