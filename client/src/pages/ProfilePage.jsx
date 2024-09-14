import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function ProfilePage() {
  const { getProfile } = useAuth()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfile()
      console.log(response)
      setProfile(response)
    }
    fetchProfile()
  }, [])

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>Your profile details will be displayed here.</p>
      {
        Object.keys(profile).length > 0 && (
          <>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Likes: {profile.likes.length}</p>
            <p>Posts: {profile.posts}</p>
          </>
        )
      }
    </div>
  )
}

export default ProfilePage

// TODO: display user posts
//TODO: logout
// TODO: change profile from an id to an username
