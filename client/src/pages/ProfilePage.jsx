import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { usePost } from '@/context/PostContext'

import Post from '@/components/Post'
import Profile from '@/components/Profile'
import NavBar from '@/components/NavBar'

function ProfilePage() {
  const { getProfile } = useAuth()
  const { getPosts, deletePost } = usePost()
  const [profile, setProfile] = useState({})
  const [posts, setPosts] = useState([])
  const params = useParams()

  useEffect(() => {
    async function fetchProfile() {
      if (params.username) {
        const response = await getProfile(params.username)
        if (response) setProfile(response)
      }
    }
    async function fetchPosts() {
      if (params.username) {
        const response = await getPosts(params.username)
        if (response) setPosts(response)
      }
    }
    fetchProfile()
    fetchPosts()
  }, [params.username])

  const handleDelete = async (id) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post._id !== id))
    } catch (error) {
      console.error('error deleting the post', error)
      // TODO: Show a notification or redirect to an error page instead of console.error
      // window.alert('Failed to delete the post')
    }
  }

  return (
    <>
      <NavBar />
      <div className="pb-16 md:absolute md:left-48 md:top-0 md:w-[calc(100%-12rem)] md:h-full">
        <div className="profile">
          <h1>Profile</h1>
          <p>Your profile details will be displayed here.</p>
          {Object.keys(profile).length > 0 && <Profile profile={profile} />}
        </div>
        <section className="posts">
          {posts.length == 0 && <p>No blogs posted yet</p>}
          {posts.length > 0 &&
            posts.map((post) => {
              return <Post key={post._id} post={post} onProfile={true} deletePost={handleDelete} />
            })}
        </section>
      </div>
    </>
  )
}

export default ProfilePage
