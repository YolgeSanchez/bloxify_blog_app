import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

import Post from '@/components/Post'
import Profile from '@/components/Profile'

function LikedPostsPage() {
  const { getProfile } = useAuth()
  const [profile, setProfile] = useState({})
  const [likedPosts, setLikes] = useState([])
  const params = useParams()

  useEffect(() => {
    async function fetchProfile() {
      if (params.username) {
        const response = await getProfile(params.username)
        setProfile(response)
        setLikes(response.likes)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="profile-page">
      <div className="profile">
        <h1>Profile</h1>
        <p>Your profile details will be displayed here.</p>
        {Object.keys(profile).length > 0 && <Profile profile={profile} />}
      </div>
      <section className="posts">
        {likedPosts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </section>
    </div>
  )
}

export default LikedPostsPage

// TODO: display user posts
//TODO: logout
// TODO: change profile from an id to an username