import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProfileOptions from '@/components/ProfileOptions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

function Profile({ profile }) {
  const { username, email, likes, posts, avatarUrl } = profile
  console.log(profile)
  const { user } = useAuth()
  const owner = user.username == username

  return (
    <Card className="w-full max-w-lg text-foreground p-6 border-none">
      <CardContent className="flex items-center space-x-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{username}</h2>
            {owner && <ProfileOptions />}
          </div>
          <p className="text-sm text-gray-400">{email}</p>
          <div className="flex space-x-6 text-sm">
            <Link to={`/profile/${username}`} className="hover:text-gray-300">
              <span className="font-bold">{posts}</span>{' '}
              <span className="text-gray-400">posts</span>
            </Link>
            <Link to={`/profile/${username}/liked`} className="hover:text-gray-300">
              <span className="font-bold">{likes.length}</span>{' '}
              <span className="text-gray-400">liked posts</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
