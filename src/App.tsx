import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicRoute } from '@/components/auth/PublicRoute'
import ToastProvider from '@/components/ui/toast'
import { HOME, LOGIN, SIGNUP, THEME } from '@/constants/routes'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { ThemePage } from '@/pages/ThemePage'
import { Navigate, Route, Routes } from 'react-router'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-text-primary">
        <Routes>
          <Route path="/" element={<Navigate to={HOME} replace />} />

          {/* Public routes - redirect to home if authenticated */}
          <Route element={<PublicRoute />}>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={SIGNUP} element={<RegistrationPage />} />
          </Route>

          {/* Protected routes - redirect to login if not authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path={HOME} element={<HomePage />} />
          </Route>

          <Route path={`${THEME}/*`} element={<ThemePage />} />
        </Routes>
      </div>
    </ToastProvider>
  )
}

export default App
