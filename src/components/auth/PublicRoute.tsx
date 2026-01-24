import { HOME } from '@/constants/routes'
import { useAppSelector } from '@/store'
import { Navigate, Outlet } from 'react-router'

export function PublicRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (isAuthenticated) {
    return <Navigate to={HOME} replace />
  }

  return <Outlet />
}
