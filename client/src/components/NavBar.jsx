import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
// import { buttonVariants } from '@/components/ui/button'
// import { Home, Search, Compass, Heart, PlusSquare, User, Menu } from 'lucide-react'
import { Home, PlusSquare, User } from 'lucide-react'

export function NavBar() {
  const { user } = useAuth()

  const aside = {
    default:
      'fixed left-0 bottom-0 w-full h-12 border-t bg-background transition-all duration-100 ease-in-out flex justify-evenly items-center z-10',
    md: 'md:w-48 md:left-0 md:top-0 md:h-full md:border-r md:flex-col md:justify-between md:p-3 md:items-start',
  }
  return (
    <aside className={`${aside.default} ${aside.md}`}>
      <div className="w-full h-full">
        <div className="py-6 pl-4 hidden md:block">
          <h1 className="text-2xl font-bold">Instagram</h1>
        </div>
        <nav className="flex md:flex-col md:space-y-2 w-full justify-around md:justify-start">
          <SidebarItem icon={<Home size={28} />} label="Home" location="/" />
          {/* <SidebarItem icon={<Search size={28} className="w-8 h-6" />} label="Search" /> */}
          {/* <SidebarItem icon={<Compass size={28} className="w-8 h-6" />} label="Explore" /> */}
          {/* <SidebarItem icon={<Heart size={28} className="w-8 h-6" />} label="Notifications" /> */}
          <SidebarItem
            icon={<PlusSquare size={28} className="w-8 h-6" />}
            label="Create"
            location="/addPost"
          />
          <SidebarItem
            icon={<User size={28} className="w-8 h-6" />}
            label="Profile"
            location={`/profile/${user.username}`}
          />
        </nav>
      </div>
      {/* <div>
        <SidebarItem icon={<Menu />} label="More" />
        </div> */}
    </aside>
  )
}

export default NavBar

function SidebarItem({ icon, label, location }) {
  return (
    <Link
      to={location}
      className="flex w-full items-center justify-center gap-3 md:gap-0 md:justify-start space-x-2 p-3 hover:bg-zinc-900 rounded-sm transition-colors duration-200"
    >
      <span className="text-foreground">{icon}</span>
      <span className="text-sm md:text-lg font-medium text-foreground hidden md:inline">
        {label}
      </span>
    </Link>
  )
}
