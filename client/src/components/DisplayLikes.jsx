import { Link } from 'react-router-dom'
import { DialogClose } from '@/components/ui/dialog'

export default function DisplayLikes({ _id, likes }) {
  return likes.map(({ username }) => (
    <Link to={`/profile/${username}`} key={`${_id}-${username}`}>
      <DialogClose>
        <div className="user">{username}</div>
      </DialogClose>
    </Link>
  ))
}
