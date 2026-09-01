import { useMemo, useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { ThemeProvider } from './context/ThemeContext'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { AlbumsPage } from './pages/AlbumsPage'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { LinksPage } from './pages/LinksPage'
import { MessagesPage } from './pages/MessagesPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'calendar', label: 'Calendar', icon: '☰' },
  { id: 'tasks', label: 'Tasks', icon: '✓' },
  { id: 'messages', label: 'Messages', icon: '✉' },
  { id: 'albums', label: 'Albums', icon: '◌' },
  { id: 'activities', label: 'Activities', icon: '✦' },
  { id: 'links', label: 'Links', icon: '↗' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const pageTitle = useMemo(
    () => navItems.find((item) => item.id === activePage)?.label ?? 'Dashboard',
    [activePage],
  )

  const renderPage = () => {
    switch (activePage) {
      case 'calendar':
        return <CalendarPage />
      case 'tasks':
        return <TasksPage />
      case 'messages':
        return <MessagesPage />
      case 'albums':
        return <AlbumsPage />
      case 'activities':
        return <ActivitiesPage />
      case 'links':
        return <LinksPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <ThemeProvider>
      <Layout
        items={navItems}
        activeItem={activePage}
        onSelect={setActivePage}
        pageTitle={pageTitle}
      >
        {renderPage()}
      </Layout>
    </ThemeProvider>
  )
}

export default App
