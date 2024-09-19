import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { usePost } from '@/context/PostContext'

export default function LikeButton({ post, onLike }) {
  const { user } = useAuth()
  const { changeLike, getPost } = usePost()
  const [liked, setLiked] = useState(null)
  const { likedBy } = post

  useEffect(() => {
    const result = likedBy.find((obj) => obj.username == user.username)
    setLiked(result)
  }, [post])

  const handleLike = async (id) => {
    try {
      const response = await changeLike(id)
      setLiked(response)

      const updatedPost = await getPost(id)
      onLike(updatedPost)
    } catch (error) {
      console.error('error updating like', error)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleLike(post._id)}
        className={`transition-transform ${liked ? 'scale-110' : 'scale-100'}`}
        aria-label={liked ? 'Unlike' : 'Like'}
      >
        <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
      </Button>
    </div>
  )
}
