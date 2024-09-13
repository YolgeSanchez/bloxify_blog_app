import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  console.log(loading, isAuthenticated)

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
