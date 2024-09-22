import { useState, useEffect } from 'react'
import { usePost } from '@/context/PostContext'
import Post from '@/components/Post'
import NavBar from '@/components/NavBar'

function HomePage() {
  const { getFeed } = usePost()
  const [feed, setFeed] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      setFeed(response)
    }
    fetchFeed()
  }, [])

  return (
    <>
      <NavBar />
      <div className="pb-16 md:absolute md:left-48 md:top-0 md:w-[100% - 12rem] md:h-full">
        <h1>Home Page</h1>
        <p>Welcome to the Blog App!</p>
        <section className="posts">
          {feed.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </section>
      </div>
    </>
  )
}

export default HomePage
