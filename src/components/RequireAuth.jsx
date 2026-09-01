import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

/**
 * Wraps protected routes. Shows a loading state while the session
 * is being resolved, redirects to /login if unauthenticated,
 * and renders children when authenticated.
 */
export function RequireAuth({ children }) {
  const { session } = useAuth()

  // session === undefined means we're still resolving on mount
  if (session === undefined) {
    return <div className="auth-loading">Loading…</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
