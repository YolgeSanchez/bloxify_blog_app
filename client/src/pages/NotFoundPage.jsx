import NavBar from '@/components/NavBar'
import { Ghost, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
      <NavBar />
      <div className="pb-16 w-full md:absolute md:left-48 md:top-0 md:w-[calc(100%-12rem)] md:h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] max-w-md mx-auto text-center px-4">
          <Ghost className="h-24 w-24 text-muted-foreground mb-8" />
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! It seems like you've wandered into uncharted territory. The page you're looking
            for doesn't exist or may have been moved.
          </p>
          <Button asChild>
            <Link to={'/'} className="inline-flex items-center">
              Go back home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
