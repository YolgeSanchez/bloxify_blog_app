import NavBar from '@/components/NavBar'
import { useForm } from 'react-hook-form'
import { usePost } from '@/context/PostContext'
import { useAuth } from '@/context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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
      <div className="pb-16 md:absolute md:left-48 md:top-0 md:w-[100% - 12rem] md:h-full">
        {postErrors.map((error, i) => (
          <div className="error" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            autoComplete="off"
            autoFocus
          />
          {errors.title && <p>Title is required</p>}
          <label htmlFor="description">Content</label>
          <textarea {...register('description', { required: true })} autoComplete="off" />
          {errors.description && <p>Description is required</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default PostFormPage
