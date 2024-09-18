import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { buttonVariants } from '@/components/ui/button'

function NavBar() {
  const { user } = useAuth()

  return (
    <nav>
      <ul>
        <li>
          <Link className={buttonVariants({ variant: 'ghost' })} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={buttonVariants({ variant: 'ghost' })} to="/addPost">
            Create
          </Link>
        </li>
        <li>
          <Link className={buttonVariants({ variant: 'ghost' })} to={`/profile/${user.username}`}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
