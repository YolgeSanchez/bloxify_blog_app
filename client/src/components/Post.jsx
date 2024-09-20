import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LikeButton from '@/components/LikeButton'
import DisplayLikes from '@/components/DisplayLikes'
import PostOptions from '@/components/PostOptions'

function Post({ post: initialPost, deletePost, onProfile = false }) {
  const { user: currentUser } = useAuth()
  const [post, setPost] = useState(initialPost)
  const { _id, title, description, createdAt, user, likedBy, likes } = post
  const owner = currentUser.username == user.username

  const updatePost = (post) => {
    setPost(post)
  }

  return (
    <article className="post">
      {onProfile && owner && <PostOptions post={post} deletePost={deletePost} />}
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
            <DisplayLikes _id={_id} likes={likedBy} />
          )}
        </DialogContent>
      </Dialog>
      <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
      <LikeButton post={post} onLike={updatePost} />
    </article>
  )
}

export default Post
