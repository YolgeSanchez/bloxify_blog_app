import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { loginUser, isAuthenticated, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (user) => {
    await loginUser(user)
  })

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {loginErrors &&
              loginErrors.map((error, index) => (
                <Alert variant="destructive" className="mb-4" key={index}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                {...register('email', { required: true })}
                placeholder="m@example.com"
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500">E-mail is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                {...register('password', { required: true })}
                autoComplete="off"
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
