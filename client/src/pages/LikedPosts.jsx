import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Post from '@/components/Post'
import Profile from '@/components/Profile'
import NavBar from '@/components/NavBar'

function LikedPostsPage() {
  const { getProfile } = useAuth()
  const [profile, setProfile] = useState({})
  const [likedPosts, setLikes] = useState([])
  const params = useParams()

  useEffect(() => {
    async function fetchProfile() {
      if (params.username) {
        const response = await getProfile(params.username)
        if (response) {
          setLikes(response.likes)
          setProfile(response)
        }
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile">
        <h1>Profile</h1>
        <p>Your profile details will be displayed here.</p>
        {Object.keys(profile).length > 0 && <Profile profile={profile} />}
      </div>
      <section className="posts">
        {likedPosts.length == 0 && <p>No posts liked yet</p>}
        {likedPosts.length > 0 && likedPosts.map((post) => <Post post={post} key={post._id} />)}
      </section>
    </div>
  )
}

export default LikedPostsPage
