import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { usePost } from '../context/PostContext.jsx'

function ProfilePage() {
  const { getProfile } = useAuth()
  const { getPosts } = usePost()
  const [profile, setProfile] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfile()
      setProfile(response)
    }
    async function fetchPosts() {
      const response = await getPosts()
      setPosts(response)
      console.log(response)
    }
    fetchProfile()
    fetchPosts()
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
            <p>Posts: {profile.posts}</p>
          </>
        )}
      </div>
      <div className="posts">
        {posts.map(({ _id, title, description, createdAt, user, likedBy }) => (
          <div key={_id} className="post">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Posted by: {user.username}</p>
            <p>Liked by: {likedBy.length}</p>
            <p>Created at: {createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage

// TODO: display user posts
//TODO: logout
// TODO: change profile from an id to an username
