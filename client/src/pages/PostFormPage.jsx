import NavBar from '@/components/NavBar'
import { useForm } from 'react-hook-form'
import { usePost } from '@/context/PostContext'
import { useAuth } from '@/context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function PostFormPage() {
  const { getPost, addPost, updatePost } = usePost()
  const { user } = useAuth()
  const { register, handleSubmit, setValue } = useForm()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fillInputs = async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setValue('title', post.title)
        setValue('description', post.description)
      }
    }
    fillInputs()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      // TODO
      const id = params.id
      const response = await updatePost(id, data)
      console.log(response)
      navigate(`/profile/${user.username}`)
    } else {
      try {
        const response = await addPost(data)
        console.log(response)
        navigate(`/profile/${user.username}`)
      } catch (error) {
        console.error('error creating the new post', error)
      }
    }
  })

  return (
    <div>
      <NavBar />
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" {...register('title')} autoComplete="off" autoFocus />
        <label htmlFor="description">Content</label>
        <textarea placeholder="Content" {...register('description')} autoComplete="off" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PostFormPage
