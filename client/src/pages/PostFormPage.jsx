import { useForm } from 'react-hook-form'

function PostFormPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    // Send data to the server
    console.log(data)
  })

  return (
    <div>
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
