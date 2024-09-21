import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {registerErrors &&
              registerErrors.map((error, index) => (
                <Alert variant="destructive" className="mb-4" key={index}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input type="text" {...register('username', { required: true })} />
              {errors.username && <p className="text-red-500">Username is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                {...register('email', { required: true })}
                placeholder="m@example.com"
              />
              {errors.email && <p className="text-red-500">E-mail is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register('password', { required: true })} />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Register</Button>
            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage
