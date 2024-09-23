import NavBar from '@/components/NavBar'
import { useForm } from 'react-hook-form'
import { usePost } from '@/context/PostContext'
import { useAuth } from '@/context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'

function PostFormPage() {
  const { getPost, addPost, updatePost, errors: postErrors } = usePost()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fillInputs = async () => {
      if (params.id) {
        const post = await getPost(params.id)
        if (post) {
          setValue('title', post.title)
          setValue('description', post.description)
        }
      }
    }
    fillInputs()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const id = params.id
      const response = await updatePost(id, data)
      if (response) navigate(`/profile/${user.username}`)
    } else {
      try {
        const response = await addPost(data)
        if (response) navigate(`/profile/${user.username}`)
      } catch (error) {
        console.error('error creating the new post', error)
      }
    }
  })

  return (
    <>
      <NavBar />
      <div className="pb-16 h-[calc(100vh-3rem)] flex items-center justify-center md:absolute md:left-48 md:top-0 md:w-[calc(100%-12rem)] md:min-h-screen ">
        <Card className="w-[85%] md:w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              {postErrors.map((error, index) => (
                <Alert variant="destructive" className="mb-4" key={index}>
                  <AlertDescription className="md:text-lg">{error}</AlertDescription>
                </Alert>
              ))}
              <div className="space-y-2">
                <Label htmlFor="title" className="md:text-lg">
                  Title
                </Label>
                <Input
                  placeholder="Enter post title"
                  {...register('title', { required: true })}
                  autoComplete="off"
                  className="md:text-md"
                />
                {errors.title && <p className="text-red-500 md:text-md">Title is required</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="md:text-lg">
                  Description
                </Label>
                <Textarea
                  placeholder="Enter post description"
                  {...register('description', { required: true })}
                  autoComplete="off"
                  className="min-h-[100px] md:min-h-[250px] md:text-md"
                />
                {errors.description && (
                  <p className="text-red-500 md:text-md">Description is required</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}

export default PostFormPage
