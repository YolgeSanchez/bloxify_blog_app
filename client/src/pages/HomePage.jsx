import { useState, useEffect } from 'react'
import { usePost } from '@/context/PostContext'
import Post from '@/components/Post'

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
    <div className="home-page">
      <h1>Home Page</h1>
      <p>Welcome to the Blog App!</p>
      <section className="posts">
        {feed.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </section>
    </div>
  )
}

export default HomePage
