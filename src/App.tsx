import { Routes, Route, Navigate } from 'react-router'
import { HomePage } from './pages/HomePage'
import { ThemePage } from './pages/ThemePage'
import { ToastProvider } from './components/ui/toast'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-text-primary">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/theme/*" element={<ThemePage />} />
        </Routes>
      </div>
    </ToastProvider>
  )
}

export default App
