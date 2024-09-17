import { Link } from 'react-router-dom'

function Profile({ profile }) {
  const { username, email, likes, posts } = profile
  return (
    <section>
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
