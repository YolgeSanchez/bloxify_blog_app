import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProfileOptions from '@/components/ProfileOptions'

function Profile({ profile }) {
  const { username, email, likes, posts } = profile
  const { user } = useAuth()
  const owner = user.username == username
  return (
    <section>
      {owner && <ProfileOptions />}
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <Link to={`/profile/${username}/liked`}>
        <p>Likes: {likes.length}</p>
      </Link>
      <Link to={`/profile/${username}`}>
        <p>Posts: {posts}</p>
      </Link>
    </section>
  )
}

export default Profile
