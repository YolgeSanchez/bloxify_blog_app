import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PostFormPage from './pages/PostFormPage.jsx'
import LikedPostsPage from './pages/LikedPosts.jsx'

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<h1>Posts</h1>} />
              <Route path="/addPost" element={<PostFormPage />} />
              <Route path="/posts/:id" element={<PostFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/liked" element={<LikedPostsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  )
}

export default App
