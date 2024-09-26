import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LikeButton from '@/components/LikeButton'
import DisplayLikes from '@/components/DisplayLikes'
import PostOptions from '@/components/PostOptions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function Post({ post: initialPost, deletePost, onProfile = false }) {
  const { user: currentUser } = useAuth()
  const [post, setPost] = useState(initialPost)
  const {
    _id: postId,
    title,
    description,
    createdAt: postDate,
    user,
    likedBy,
    likes: likesCount,
  } = post
  const owner = currentUser.username == user.username
  const author = user.username

  const updatePost = (post) => {
    setPost(post)
  }

  return (
    <Card className="w-full max-w-xl mx-auto md:p-4 mb-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            Posted by{' '}
            <Link className="font-bold" to={`/profile/${author}`}>
              {author}
            </Link>{' '}
            on {new Date(postDate).toLocaleDateString()}
          </p>
        </div>

        {onProfile && owner && <PostOptions post={post} deletePost={deletePost} />}
      </CardHeader>
      <CardContent className="mt-3">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Dialog>
          <DialogTrigger>
            <p className="text-sm text-primary hover:underline">{likesCount} likes</p>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-center">Likes</DialogTitle>
            </DialogHeader>
            {likedBy.length == 0 ? (
              <p className="text-center">This post does not have likes yet</p>
            ) : (
              <DisplayLikes _id={postId} likes={likedBy} />
            )}
          </DialogContent>
        </Dialog>

        <LikeButton post={post} onLike={updatePost} />
      </CardFooter>
    </Card>
  )
}

export default Post
