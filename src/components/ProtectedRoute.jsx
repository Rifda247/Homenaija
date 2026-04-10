import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-10 h-10 border-4 border-brown border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
