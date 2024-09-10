import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>register</h1>} />
        <Route path="/posts" element={<h1>Posts</h1>} />
        <Route path="/addPost" element={<h1>Add post</h1>} />
        <Route path="/posts/:id" element={<h1>Update post</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
