import './App.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { AlbumsPage } from './pages/AlbumsPage'
import { AuthPage } from './pages/AuthPage'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { LinksPage } from './pages/LinksPage'
import { MessagesPage } from './pages/MessagesPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

export const navItems = [
  { path: '/', label: 'Dashboard', icon: '⌂' },
  { path: '/calendar', label: 'Calendar', icon: '☰' },
  { path: '/tasks', label: 'Tasks', icon: '✓' },
  { path: '/messages', label: 'Messages', icon: '✉' },
  { path: '/albums', label: 'Albums', icon: '◌' },
  { path: '/activities', label: 'Activities', icon: '✦' },
  { path: '/links', label: 'Links', icon: '↗' },
  { path: '/settings', label: 'Settings', icon: '⚙' },
]

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<AuthPage />} />

            {/* All app routes are protected */}
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <Layout items={navItems}>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/albums" element={<AlbumsPage />} />
                      <Route path="/activities" element={<ActivitiesPage />} />
                      <Route path="/links" element={<LinksPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                </RequireAuth>
              }
            />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
