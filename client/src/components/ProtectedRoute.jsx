import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (!loading && !isAuthenticated) return <Navigate to="/login" />
  if (!loading && isAuthenticated) return <Outlet />
}

export default ProtectedRoute
