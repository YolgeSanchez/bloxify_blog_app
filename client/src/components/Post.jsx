import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function Post({ post }) {
  const { _id, title, description, createdAt, user, likedBy, likes } = post

  return (
    <article className="post">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Posted by: {user.username}</p>
      <p>heart</p>
      <Dialog>
        <DialogTrigger>
          <p>{likes} likes</p>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-center">Likes</DialogTitle>
          </DialogHeader>
          {likedBy.length == 0 ? (
            <p className="text-center">This post does not have likes yet</p>
          ) : (
            likedBy.map(({ username }) => (
              <div className="user" key={`${_id}-${username}`}>
                {username}
              </div>
            ))
          )}
        </DialogContent>
      </Dialog>
      <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
    </article>
  )
}

export default Post
