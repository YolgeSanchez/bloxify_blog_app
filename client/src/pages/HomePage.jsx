import { usePost } from '@/context/PostContext'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function HomePage() {
  const { getFeed } = usePost()
  const [feed, setFeed] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      setFeed(response)
    }
    fetchFeed()
  }, [])

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <p>Welcome to the Blog App!</p>
      <div className="posts">
        {feed.map(({ _id, title, description, createdAt, user, likedBy, likes }) => (
          <div key={_id} className="post">
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
                  likedBy.map((like) => {
                    return (
                      <div className="user" key={like.username}>
                        {like.username}
                      </div>
                    )
                  })
                )}
              </DialogContent>
            </Dialog>
            <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
