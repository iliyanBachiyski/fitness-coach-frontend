import { LOGIN } from '@/constants/routes'
import { useAppSelector } from '@/store'
import { Navigate, Outlet } from 'react-router'

export function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace />
  }

  return <Outlet />
}
