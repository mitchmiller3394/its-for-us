import { useTheme } from '../context/ThemeContext'

import { useLocation } from 'react-router'
import { navItems } from '../App'

export function Topbar() {
  const { pathname } = useLocation()
  const pageTitle = navItems.find((item) => item.path === pathname)?.label ?? 'Dashboard'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow eyebrow--light">Couple dashboard</p>
        <h1>{pageTitle}</h1>
      </div>
    </header>
  )
}
