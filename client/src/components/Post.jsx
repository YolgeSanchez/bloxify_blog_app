import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Link } from 'react-router-dom'

function Post({ post }) {
  const { _id, title, description, createdAt, user, likedBy, likes } = post

  return (
    <article className="post">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/profile/${user.username}`}>
        <p>Posted by: {user.username}</p>
      </Link>
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
              <Link to={`/profile/${username}`} key={`${_id}-${username}`}>
                <DialogClose>
                  <div className="user">{username}</div>
                </DialogClose>
              </Link>
            ))
          )}
        </DialogContent>
      </Dialog>
      <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
    </article>
  )
}

export default Post
