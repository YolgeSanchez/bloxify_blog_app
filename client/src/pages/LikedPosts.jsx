import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function LikedPostsPage() {
  const { getProfile } = useAuth()
  const [profile, setProfile] = useState({})
  const [likedPosts, setLikes] = useState([])

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfile()
      setProfile(response)
      setLikes(response.likes)
    }
    fetchProfile()
  }, [])

  return (
    <div className="profile-page">
      <div className="profile">
        <h1>Profile</h1>
        <p>Your profile details will be displayed here.</p>
        {Object.keys(profile).length > 0 && (
          <>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Likes: {profile.likes.length}</p>
            <Link to="/profile">
              <p>Posts: {profile.posts}</p>
            </Link>
          </>
        )}
      </div>
      <div className="posts">
        {likedPosts.map(({ _id, title, description, createdAt, user, likedBy, likes }) => (
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
                  likedBy.map((like) => (
                    <div className="user" key={like.username}>
                      {like.username}
                    </div>
                  ))
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

export default LikedPostsPage

// TODO: display user posts
//TODO: logout
// TODO: change profile from an id to an username
