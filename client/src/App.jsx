import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PostFormPage from './pages/PostFormPage.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <PostProvider>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<h1>Posts</h1>} />
              <Route path="/addPost" element={<PostFormPage />} />
              <Route path="/posts/:id" element={<PostFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </PostProvider>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
